import { Controller, Post, Get, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { SubmitAttemptDto } from './dto/submit-attempt.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Attempts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) { }

  @Post()
  @ApiOperation({ summary: 'Submit a new dictation attempt' })
  submit(@Request() req: any, @Body() dto: SubmitAttemptDto) {
    return this.attemptsService.submit(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user attempts history' })
  findUserAttempts(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.attemptsService.findUserAttempts(
      req.user.id,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific attempt' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.attemptsService.findOne(id, req.user.id);
  }
}
