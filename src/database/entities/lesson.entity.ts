import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PartType, Difficulty } from '../enums';
import { Sentence } from './sentence.entity';
import { Attempt } from './attempt.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: PartType })
  part_type: PartType;

  @Column()
  audio_url: string;

  @Column({ type: 'int', default: 0 })
  duration_seconds: number;

  @Column({ type: 'int', default: 0 })
  total_sentences: number;

  @Column({ type: 'enum', enum: Difficulty, default: Difficulty.MEDIUM })
  difficulty: Difficulty;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Sentence, (sentence) => sentence.lesson, { cascade: true })
  sentences: Sentence[];

  @OneToMany(() => Attempt, (attempt) => attempt.lesson)
  attempts: Attempt[];
}
