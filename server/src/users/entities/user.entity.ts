import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ChatSession } from '../../chat/entities/chat-session.entity';
import { MoodLog } from '../../mood/entities/mood-log.entity';
import { UserProfile } from './user-profile.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  emailVerified: boolean;

  @OneToOne(() => UserProfile, profile => profile.user, { cascade: true })
  profile: UserProfile;

  @OneToMany(() => ChatSession, session => session.user)
  chatSessions: ChatSession[];

  @OneToMany(() => MoodLog, moodLog => moodLog.user)
  moodLogs: MoodLog[];
}