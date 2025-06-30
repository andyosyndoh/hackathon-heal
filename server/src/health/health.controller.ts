import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return this.healthService.getHealth();
  }

  @Get('debug')
  @ApiOperation({ summary: 'Debug information endpoint' })
  @ApiResponse({ status: 200, description: 'Debug information retrieved' })
  getDebug() {
    return this.healthService.getDebug();
  }
}