import { IsString, IsNotEmpty, IsEnum, IsUrl, IsInt, Min, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PartType, Difficulty } from '../../database/enums';

export class CreateSentenceDto {
  @IsInt()
  @Min(1)
  order_index: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @Min(0)
  start_time: number;

  @IsNumber()
  @Min(0)
  end_time: number;

  @IsOptional()
  keywords?: any;

  @IsOptional()
  phrases?: any;
}

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(PartType)
  part_type: PartType;

  @IsUrl()
  audio_url: string;

  @IsInt()
  @Min(1)
  duration_seconds: number;

  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: Difficulty;

  @ValidateNested({ each: true })
  @Type(() => CreateSentenceDto)
  sentences: CreateSentenceDto[];
}
