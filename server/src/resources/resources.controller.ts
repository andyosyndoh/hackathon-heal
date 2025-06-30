import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Resources')
@Controller('resources')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resources with optional filters' })
  @ApiResponse({ status: 200, description: 'Resources retrieved successfully' })
  async getResources(
    @Query('category') category?: string,
    @Query('type') type?: string,
    @Query('difficulty') difficulty?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.resourcesService.getResources({ category, type, difficulty, limit, offset });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific resource by ID' })
  @ApiResponse({ status: 200, description: 'Resource retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  async getResource(@Param('id') id: string) {
    const resource = await this.resourcesService.getResource(id);
    if (!resource) {
      return { error: 'Resource not found' };
    }
    return resource;
  }
}