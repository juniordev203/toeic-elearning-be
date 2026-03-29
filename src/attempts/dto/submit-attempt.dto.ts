import { IsString, IsNotEmpty, IsEnum, ValidateNested, IsDateString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DictationMode } from '../../database/enums';

export class SubmitAttemptDetailDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  sentence_id: string;

  @ApiProperty({ example: 'Hello, this is a message for David Lee.' })
  @IsString()
  user_input: string;
}

export class SubmitAttemptDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  lesson_id: string;

  @ApiProperty({ enum: DictationMode, example: DictationMode.FULL_SENTENCE })
  @IsEnum(DictationMode)
  difficulty_mode: DictationMode;

  @ApiProperty({ type: [SubmitAttemptDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAttemptDetailDto)
  details: SubmitAttemptDetailDto[];

  @ApiProperty({ example: '2026-03-29T15:09:57.348Z' })
  @IsDateString()
  started_at: string;

  @ApiProperty({ example: '2026-03-29T15:13:13.856Z' })
  @IsDateString()
  completed_at: string;
}
