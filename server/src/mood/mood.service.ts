import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { MoodLog } from './entities/mood-log.entity';
import { User } from '../users/entities/user.entity';
import { LogMoodDto } from './dto/log-mood.dto';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(MoodLog)
    private moodLogRepository: Repository<MoodLog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async logMood(userId: string, logMoodDto: LogMoodDto) {
    const { moodScore, notes } = logMoodDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const moodLog = this.moodLogRepository.create({
      moodScore,
      notes,
      user,
    });

    const savedLog = await this.moodLogRepository.save(moodLog);

    return {
      id: savedLog.id,
      userId: savedLog.user.id,
      moodScore: savedLog.moodScore,
      notes: savedLog.notes,
      createdAt: savedLog.createdAt,
    };
  }

  async getMoodHistory(userId: string, days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const logs = await this.moodLogRepository.find({
      where: {
        user: { id: userId },
        createdAt: MoreThan(cutoffDate),
      },
      order: { createdAt: 'DESC' },
    });

    return {
      logs: logs.map(log => ({
        id: log.id,
        userId: log.user.id,
        moodScore: log.moodScore,
        notes: log.notes,
        createdAt: log.createdAt,
      })),
    };
  }
}