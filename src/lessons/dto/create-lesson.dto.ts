import { IsString, IsNotEmpty, IsEnum, IsUrl, IsInt, Min, ValidateNested, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartType, Difficulty } from '../../database/enums';

export class CreateSentenceDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  order_index: number;

  @ApiProperty({ example: 'Did you order the new printer cartridges yet?' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 0.5 })
  @IsNumber()
  @Min(0)
  start_time: number;

  @ApiProperty({ example: 3.2 })
  @IsNumber()
  @Min(0)
  end_time: number;

  @ApiPropertyOptional({ example: ['order', 'printer', 'cartridges'], type: [String] })
  @IsOptional()
  keywords?: string[];

  @ApiPropertyOptional({ example: ['order the new', 'printer cartridges'], type: [String] })
  @IsOptional()
  phrases?: string[];
}

export class CreateLessonDto {
  @ApiProperty({ example: 'Part 3: Requesting Time Off' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'A conversation about PTO.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: PartType, example: PartType.PART3 })
  @IsEnum(PartType)
  part_type: PartType;

  @ApiProperty({ example: 'https://example.com/audio.mp3' })
  @IsUrl()
  audio_url: string;

  @ApiProperty({ example: 45 })
  @IsInt()
  @Min(1)
  duration_seconds: number;

  @ApiPropertyOptional({ enum: Difficulty, example: Difficulty.MEDIUM })
  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: Difficulty;

  @ApiProperty({ type: [CreateSentenceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSentenceDto)
  sentences: CreateSentenceDto[];
}
