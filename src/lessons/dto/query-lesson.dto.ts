import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PartType, Difficulty } from '../../database/enums';

export class QueryLessonDto extends PaginationDto {
  @IsOptional()
  @IsEnum(PartType)
  part_type?: PartType;

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsString()
  search?: string;
}
