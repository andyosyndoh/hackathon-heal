import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogMoodDto {
  @ApiProperty({ example: 7, minimum: 1, maximum: 10 })
  @IsNumber()
  @Min(1)
  @Max(10)
  moodScore: number;

  @ApiProperty({ example: 'Feeling better today', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}