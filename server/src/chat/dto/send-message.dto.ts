import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'I am feeling anxious today' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'session-uuid', required: false })
  @IsString()
  @IsOptional()
  sessionId?: string;

  @ApiProperty({ example: 'text', required: false })
  @IsString()
  @IsOptional()
  messageType?: string;
}