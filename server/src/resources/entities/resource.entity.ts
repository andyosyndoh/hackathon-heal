import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('resources')
export class Resource extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column()
  type: string; // 'article', 'video', 'audio', 'exercise', 'assessment', 'contact'

  @Column()
  category: string;

  @Column()
  difficulty: string; // 'beginner', 'intermediate', 'advanced', 'Easy'

  @Column({ default: 0 })
  durationMinutes: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: false })
  featured: boolean;
}