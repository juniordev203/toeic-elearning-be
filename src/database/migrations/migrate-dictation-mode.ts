import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';

async function migrate() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('Migrating difficulty_mode enum...');

  await dataSource.query(`
    -- Step 1: Alter column to text temporarily
    ALTER TABLE attempts ALTER COLUMN difficulty_mode TYPE text;
  `);

  await dataSource.query(`
    -- Step 2: Drop the old enum type
    DROP TYPE IF EXISTS attempts_difficulty_mode_enum;
  `);

  await dataSource.query(`
    -- Step 3: Create the new enum type
    CREATE TYPE attempts_difficulty_mode_enum AS ENUM ('KEYWORD', 'PHRASE', 'FULL_SENTENCE');
  `);

  await dataSource.query(`
    -- Step 4: Convert any old values to FULL_SENTENCE
    UPDATE attempts SET difficulty_mode = 'FULL_SENTENCE' WHERE difficulty_mode NOT IN ('KEYWORD', 'PHRASE', 'FULL_SENTENCE');
  `);

  await dataSource.query(`
    -- Step 5: Alter column back to the new enum type
    ALTER TABLE attempts ALTER COLUMN difficulty_mode TYPE attempts_difficulty_mode_enum USING difficulty_mode::attempts_difficulty_mode_enum;
  `);

  console.log('Migration completed successfully!');
  await app.close();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
