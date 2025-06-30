import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async getProfile(userId: string) {
    const profile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      userId: profile.user.id,
      avatarUrl: profile.avatarUrl,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      emergencyContactName: profile.emergencyContactName,
      emergencyContactPhone: profile.emergencyContactPhone,
      preferences: profile.preferences,
    };
  }

  async updateProfile(userId: string, updates: any) {
    const profile = await this.userProfileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, updates);
    await this.userProfileRepository.save(profile);

    return { message: 'Profile updated successfully' };
  }

  async getStats(userId: string) {
    // This would typically involve complex queries across multiple tables
    // For now, returning mock data
    return {
      currentStreak: 5,
      totalSessions: 12,
      moodScore: 7.2,
      resourcesViewed: 8,
      daysActive: 15,
    };
  }
}