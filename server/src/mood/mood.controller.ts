import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MoodService } from './mood.service';
import { LogMoodDto } from './dto/log-mood.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Mood')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MoodController {
  constructor(private moodService: MoodService) {}

  @Post('mood')
  @ApiOperation({ summary: 'Log mood entry' })
  @ApiResponse({ status: 201, description: 'Mood logged successfully' })
  async logMood(@Request() req, @Body() logMoodDto: LogMoodDto) {
    return this.moodService.logMood(req.user.id, logMoodDto);
  }

  @Get('mood-history')
  @ApiOperation({ summary: 'Get mood history' })
  @ApiResponse({ status: 200, description: 'Mood history retrieved successfully' })
  async getMoodHistory(@Request() req, @Query('days') days?: number) {
    return this.moodService.getMoodHistory(req.user.id, days);
  }
}