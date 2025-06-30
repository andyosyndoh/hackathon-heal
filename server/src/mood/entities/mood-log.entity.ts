import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('mood_logs')
export class MoodLog extends BaseEntity {
  @Column()
  moodScore: number; // 1-10

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => User, user => user.moodLogs)
  user: User;
}