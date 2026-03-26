import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttemptsService } from './attempts.service';
import { AttemptsController } from './attempts.controller';
import { Attempt } from '../database/entities/attempt.entity';
import { AttemptDetail } from '../database/entities/attempt-detail.entity';
import { Sentence } from '../database/entities/sentence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt, AttemptDetail, Sentence])],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule { }
