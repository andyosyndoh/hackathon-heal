import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

@Entity('chat_sessions')
export class ChatSession extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => User, user => user.chatSessions)
  user: User;

  @OneToMany(() => ChatMessage, message => message.session)
  messages: ChatMessage[];
}