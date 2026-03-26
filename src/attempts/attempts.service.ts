import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attempt } from '../database/entities/attempt.entity';
import { AttemptDetail } from '../database/entities/attempt-detail.entity';
import { Sentence } from '../database/entities/sentence.entity';
import { SubmitAttemptDto } from './dto/submit-attempt.dto';
import { calculateSimilarity } from './utils/scoring.util';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt)
    private attemptsRepo: Repository<Attempt>,
    @InjectRepository(AttemptDetail)
    private attemptDetailsRepo: Repository<AttemptDetail>,
    @InjectRepository(Sentence)
    private sentencesRepo: Repository<Sentence>,
  ) { }

  async submit(userId: string, dto: SubmitAttemptDto) {
    const sentences = await this.sentencesRepo.find({
      where: { lesson_id: dto.lesson_id },
    });

    if (sentences.length === 0) {
      throw new NotFoundException('Lesson not found or has no sentences');
    }

    const sentencesMap = new Map<string, Sentence>();
    sentences.forEach((s) => sentencesMap.set(s.id, s));

    let totalSimilarity = 0;
    let correctSentences = 0;

    const detailsToSave = dto.details.map((detail) => {
      const sentence = sentencesMap.get(detail.sentence_id);
      if (!sentence) {
        throw new NotFoundException(`Sentence ${detail.sentence_id} not found in this lesson`);
      }

      const similarity = calculateSimilarity(detail.user_input, sentence.content);
      const isCorrect = similarity >= 0.95; // 95% threshold for "correct"

      if (isCorrect) correctSentences++;
      totalSimilarity += similarity;

      return this.attemptDetailsRepo.create({
        sentence_id: detail.sentence_id,
        user_input: detail.user_input,
        similarity_score: similarity,
        is_correct: isCorrect,
      });
    });

    const totalSentences = sentences.length;
    const accuracyPercent = (totalSimilarity / totalSentences) * 100;

    const startedAt = new Date(dto.started_at);
    const completedAt = new Date(dto.completed_at);
    const durationSeconds = Math.round((completedAt.getTime() - startedAt.getTime()) / 1000);

    const attempt = this.attemptsRepo.create({
      user_id: userId,
      lesson_id: dto.lesson_id,
      difficulty_mode: dto.difficulty_mode,
      score: Math.round(accuracyPercent * 10), // Example scoring logic
      accuracy_percent: accuracyPercent,
      correct_sentences: correctSentences,
      total_sentences: totalSentences,
      started_at: startedAt,
      completed_at: completedAt,
      duration_seconds: durationSeconds,
      details: detailsToSave,
    });

    return this.attemptsRepo.save(attempt);
  }

  async findUserAttempts(userId: string, page: number = 1, limit: number = 10) {
    const [data, total] = await this.attemptsRepo.findAndCount({
      where: { user_id: userId },
      relations: ['lesson'],
      order: { completed_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, userId: string) {
    const attempt = await this.attemptsRepo.findOne({
      where: { id, user_id: userId },
      relations: ['lesson', 'details', 'details.sentence'],
    });

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    return attempt;
  }
}
