import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PartType, Difficulty } from '../../database/enums';

export class QueryLessonDto extends PaginationDto {
  @ApiPropertyOptional({ enum: PartType })
  @IsOptional()
  @IsEnum(PartType)
  part_type?: PartType;

  @ApiPropertyOptional({ enum: Difficulty })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
