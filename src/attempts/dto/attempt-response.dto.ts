import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DictationMode } from '../../database/enums';
import { SentenceResponseDto } from '../../lessons/dto/lesson-response.dto';

export class AttemptDetailResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  sentence_id: string;

  @ApiProperty({ example: 'Hello, this is a message for David Lee.' })
  user_input: string;

  @ApiProperty({ example: false })
  is_correct: boolean;

  @ApiProperty({ example: 0.85 })
  similarity_score: number;

  @ApiPropertyOptional({ type: SentenceResponseDto })
  sentence?: SentenceResponseDto;
}

export class AttemptResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  user_id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  lesson_id: string;

  @ApiProperty({ enum: DictationMode, example: DictationMode.FULL_SENTENCE })
  difficulty_mode: DictationMode;

  @ApiProperty({ example: 856 })
  score: number;

  @ApiProperty({ example: 85.6 })
  accuracy_percent: number;

  @ApiProperty({ example: 5 })
  correct_sentences: number;

  @ApiProperty({ example: 6 })
  total_sentences: number;

  @ApiProperty({ example: 196 })
  duration_seconds: number;

  @ApiProperty()
  started_at: Date;

  @ApiProperty()
  completed_at: Date;

  @ApiPropertyOptional({ type: [AttemptDetailResponseDto] })
  details?: AttemptDetailResponseDto[];
}

export class AttemptListMetaDto {
  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}

export class AttemptListResponseDto {
  @ApiProperty({ type: [AttemptResponseDto] })
  data: AttemptResponseDto[];

  @ApiProperty({ type: AttemptListMetaDto })
  meta: AttemptListMetaDto;
}
