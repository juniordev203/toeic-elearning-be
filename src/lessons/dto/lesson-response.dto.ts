import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartType, Difficulty } from '../../database/enums';

export class SentenceResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 1 })
  order_index: number;

  @ApiProperty({ example: 'Did you order the new printer cartridges yet?' })
  content: string;

  @ApiProperty({ example: 0.5 })
  start_time: number;

  @ApiProperty({ example: 3.2 })
  end_time: number;

  @ApiPropertyOptional({ example: ['order', 'printer', 'cartridges'], type: [String] })
  keywords: string[];

  @ApiPropertyOptional({ example: ['order the new', 'printer cartridges'], type: [String] })
  phrases: string[];
}

export class LessonResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Part 3: Requesting Time Off' })
  title: string;

  @ApiPropertyOptional({ example: 'A conversation about PTO.' })
  description: string;

  @ApiProperty({ enum: PartType, example: PartType.PART3 })
  part_type: PartType;

  @ApiProperty({ example: 'https://example.com/audio.mp3' })
  audio_url: string;

  @ApiProperty({ example: 45 })
  duration_seconds: number;

  @ApiProperty({ example: 6 })
  total_sentences: number;

  @ApiProperty({ enum: Difficulty, example: Difficulty.MEDIUM })
  difficulty: Difficulty;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiPropertyOptional({ type: [SentenceResponseDto] })
  sentences?: SentenceResponseDto[];
}

export class LessonListMetaDto {
  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}

export class LessonListResponseDto {
  @ApiProperty({ type: [LessonResponseDto] })
  data: LessonResponseDto[];

  @ApiProperty({ type: LessonListMetaDto })
  meta: LessonListMetaDto;
}
