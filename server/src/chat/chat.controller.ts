import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send a chat message' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(req.user.id, sendMessageDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get chat history for a session' })
  @ApiResponse({ status: 200, description: 'Chat history retrieved successfully' })
  async getChatHistory(
    @Request() req,
    @Query('session_id') sessionId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.chatService.getChatHistory(req.user.id, sessionId, limit, offset);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Get all chat sessions for user' })
  @ApiResponse({ status: 200, description: 'Chat sessions retrieved successfully' })
  async getChatSessions(
    @Request() req,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.chatService.getChatSessions(req.user.id, limit, offset);
  }

  @Delete('session/:id')
  @ApiOperation({ summary: 'Delete a chat session' })
  @ApiResponse({ status: 200, description: 'Session deleted successfully' })
  async deleteChatSession(@Request() req, @Param('id') sessionId: string) {
    return this.chatService.deleteChatSession(req.user.id, sessionId);
  }
}