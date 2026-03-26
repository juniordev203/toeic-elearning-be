import { IsString, IsNotEmpty, IsEnum, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { DifficultyMode } from '../../database/enums';

export class SubmitAttemptDetailDto {
  @IsString()
  @IsNotEmpty()
  sentence_id: string;

  @IsString()
  user_input: string;
}

export class SubmitAttemptDto {
  @IsString()
  @IsNotEmpty()
  lesson_id: string;

  @IsEnum(DifficultyMode)
  difficulty_mode: DifficultyMode;

  @ValidateNested({ each: true })
  @Type(() => SubmitAttemptDetailDto)
  details: SubmitAttemptDetailDto[];

  @IsDateString()
  started_at: string;

  @IsDateString()
  completed_at: string;
}
