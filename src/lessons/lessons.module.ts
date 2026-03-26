import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from '../database/entities/lesson.entity';
import { Sentence } from '../database/entities/sentence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Sentence])],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule { }
