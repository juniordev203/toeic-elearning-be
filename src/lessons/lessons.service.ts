import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../database/entities/lesson.entity';
import { Sentence } from '../database/entities/sentence.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { QueryLessonDto } from './dto/query-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepo: Repository<Lesson>,
    @InjectRepository(Sentence)
    private sentencesRepo: Repository<Sentence>,
  ) { }

  async findAll(query: QueryLessonDto) {
    const { page = 1, limit = 10, part_type, difficulty, search } = query;
    const qb = this.lessonsRepo.createQueryBuilder('lesson');

    if (part_type) {
      qb.andWhere('lesson.part_type = :part_type', { part_type });
    }
    if (difficulty) {
      qb.andWhere('lesson.difficulty = :difficulty', { difficulty });
    }
    if (search) {
      qb.andWhere('lesson.title ILIKE :search', { search: `%${search}%` });
    }

    qb.skip((page - 1) * limit).take(limit).orderBy('lesson.created_at', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const lesson = await this.lessonsRepo.findOne({
      where: { id },
      relations: ['sentences'],
      order: { sentences: { order_index: 'ASC' } },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async create(dto: CreateLessonDto) {
    const lesson = this.lessonsRepo.create({
      ...dto,
      total_sentences: dto.sentences.length,
    });
    return this.lessonsRepo.save(lesson);
  }
}
