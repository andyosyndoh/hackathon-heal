import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrisisService } from './crisis.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Crisis')
@Controller('crisis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CrisisController {
  constructor(private crisisService: CrisisService) {}

  @Get('services')
  @ApiOperation({ summary: 'Get local crisis services' })
  @ApiResponse({ status: 200, description: 'Local services retrieved successfully' })
  async getLocalServices(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    return this.crisisService.getLocalServices(lat, lng);
  }
}