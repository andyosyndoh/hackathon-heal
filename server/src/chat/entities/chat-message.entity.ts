import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ChatSession } from './chat-session.entity';
import { User } from '../../users/entities/user.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @Column('text')
  content: string;

  @Column()
  senderType: string; // 'user' or 'ai'

  @Column({ default: 'text' })
  messageType: string; // 'text', 'audio', 'video'

  @Column('text', { nullable: true })
  metadata: string;

  @ManyToOne(() => ChatSession, session => session.messages)
  session: ChatSession;

  @ManyToOne(() => User)
  user: User;
}