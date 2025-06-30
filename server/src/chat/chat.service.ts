import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession } from './entities/chat-session.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { User } from '../users/entities/user.entity';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatSession)
    private chatSessionRepository: Repository<ChatSession>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendMessage(userId: string, sendMessageDto: SendMessageDto) {
    const { sessionId, content, messageType = 'text' } = sendMessageDto;
    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get or create session
    let session: ChatSession;
    if (sessionId) {
      session = await this.chatSessionRepository.findOne({
        where: { id: sessionId, user: { id: userId } },
        relations: ['user'],
      });
      if (!session) {
        throw new NotFoundException('Session not found');
      }
    } else {
      // Create new session
      session = this.chatSessionRepository.create({
        title: `Chat Session - ${new Date().toLocaleDateString()}`,
        user,
      });
      session = await this.chatSessionRepository.save(session);
    }

    // Save user message
    const userMessage = this.chatMessageRepository.create({
      content,
      senderType: 'user',
      messageType,
      session,
      user,
    });
    await this.chatMessageRepository.save(userMessage);

    // Generate AI response
    const aiResponse = await this.generateAIResponse(content);

    // Save AI message
    const aiMessage = this.chatMessageRepository.create({
      content: aiResponse,
      senderType: 'ai',
      messageType: 'text',
      session,
      user,
      metadata: JSON.stringify({
        model: 'gemini-1.5-flash',
        timestamp: new Date().toISOString(),
        userMessageId: userMessage.id,
      }),
    });
    await this.chatMessageRepository.save(aiMessage);

    return {
      session: {
        id: session.id,
        userId: session.user.id,
        title: session.title,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
      userMessage: {
        id: userMessage.id,
        content: userMessage.content,
        senderType: userMessage.senderType,
        messageType: userMessage.messageType,
        createdAt: userMessage.createdAt,
      },
      aiMessage: {
        id: aiMessage.id,
        content: aiMessage.content,
        senderType: aiMessage.senderType,
        messageType: aiMessage.messageType,
        createdAt: aiMessage.createdAt,
      },
      response: aiResponse,
    };
  }

  async getChatHistory(userId: string, sessionId: string, limit = 50, offset = 0) {
    const session = await this.chatSessionRepository.findOne({
      where: { id: sessionId, user: { id: userId } },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const messages = await this.chatMessageRepository.find({
      where: { session: { id: sessionId } },
      order: { createdAt: 'ASC' },
      take: limit,
      skip: offset,
    });

    return {
      messages: messages.map(msg => ({
        id: msg.id,
        sessionId: msg.session.id,
        userId: msg.user.id,
        content: msg.content,
        senderType: msg.senderType,
        messageType: msg.messageType,
        createdAt: msg.createdAt,
      })),
    };
  }

  async getChatSessions(userId: string, limit = 20, offset = 0) {
    const sessions = await this.chatSessionRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      sessions: sessions.map(session => ({
        id: session.id,
        userId: session.user.id,
        title: session.title,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      })),
    };
  }

  async deleteChatSession(userId: string, sessionId: string) {
    const session = await this.chatSessionRepository.findOne({
      where: { id: sessionId, user: { id: userId } },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.chatSessionRepository.remove(session);
    return { message: 'Session deleted successfully' };
  }

  private async generateAIResponse(message: string): Promise<string> {
    // Check for crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm', 'die', 'death'];
    const lowerMessage = message.toLowerCase();
    
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "I'm really concerned about what you're sharing with me. Your life has value, and there are people who want to help. Please reach out to a crisis helpline immediately: Call 988 (Suicide & Crisis Lifeline) or text 'HELLO' to 741741. You don't have to go through this alone.";
    }

    // Try Gemini AI if API key is available
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a compassionate AI mental health companion named Heal. Your role is to:

1. Provide empathetic, supportive responses to users experiencing mental health challenges
2. Use active listening techniques and validate emotions
3. Offer evidence-based coping strategies when appropriate
4. Maintain professional boundaries while being warm and understanding
5. Recognize crisis situations and guide users to professional help
6. Never provide medical diagnoses or replace professional therapy
7. Keep responses conversational, supportive, and under 150 words
8. Use person-first language and avoid stigmatizing terms

User message: ${message}

Please respond with empathy and support:`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 200,
            },
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
          }
        }
      } catch (error) {
        console.error('Gemini API error:', error);
      }
    }

    // Fallback responses
    return this.getFallbackResponse(message);
  }

  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "I hear that you're feeling anxious, and that can be really overwhelming. Anxiety is your body's way of trying to protect you, but I understand it doesn't feel helpful right now. Have you tried any grounding techniques like the 5-4-3-2-1 method?";
    }

    if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad')) {
      return "Thank you for sharing how you're feeling with me. Depression can make everything feel heavy and difficult, and it takes courage to reach out. Your feelings are valid, and you're not alone in this.";
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
      return "It sounds like you're carrying a lot right now, and feeling overwhelmed is completely understandable. When we're stressed, everything can feel urgent and impossible to manage. Let's try to break things down.";
    }

    const responses = [
      "I understand how you're feeling. It takes courage to share what's on your mind. Can you tell me more about what's been bothering you?",
      "Thank you for opening up to me. Your feelings are completely valid. What would help you feel more supported right now?",
      "I'm here to listen without judgment. It sounds like you're going through a challenging time. How long have you been feeling this way?",
      "That sounds really difficult to deal with. You're not alone in this. What coping strategies have you tried before?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}