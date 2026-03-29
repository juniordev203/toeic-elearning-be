import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { QueryLessonDto } from './dto/query-lesson.dto';
import { LessonResponseDto, LessonListResponseDto } from './dto/lesson-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all lessons with pagination and filters' })
  @ApiResponse({ status: 200, type: LessonListResponseDto })
  findAll(@Query() query: QueryLessonDto) {
    return this.lessonsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific lesson by ID (Protected)' })
  @ApiResponse({ status: 200, type: LessonResponseDto })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new lesson (Admin)' })
  @ApiResponse({ status: 201, type: LessonResponseDto })
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }
}
