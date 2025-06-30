import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService implements OnModuleInit {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async onModuleInit() {
    await this.seedResources();
  }

  async getResources(filters: any = {}) {
    const { category, type, difficulty, limit = 20, offset = 0 } = filters;
    
    const queryBuilder = this.resourceRepository.createQueryBuilder('resource');

    if (category && category !== 'all') {
      queryBuilder.andWhere('LOWER(resource.category) = LOWER(:category)', { category });
    }

    if (type && type !== 'all') {
      queryBuilder.andWhere('LOWER(resource.type) = LOWER(:type)', { type });
    }

    if (difficulty && difficulty !== 'all') {
      queryBuilder.andWhere('LOWER(resource.difficulty) = LOWER(:difficulty)', { difficulty });
    }

    const resources = await queryBuilder
      .orderBy('resource.featured', 'DESC')
      .addOrderBy('resource.rating', 'DESC')
      .addOrderBy('resource.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();

    return {
      resources: resources.map(resource => ({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        content: resource.content,
        type: resource.type,
        category: resource.category,
        difficulty: resource.difficulty,
        durationMinutes: resource.durationMinutes,
        rating: resource.rating,
        featured: resource.featured,
        createdAt: resource.createdAt,
        updatedAt: resource.updatedAt,
      })),
    };
  }

  async getResource(id: string) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      return null;
    }

    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      content: resource.content,
      type: resource.type,
      category: resource.category,
      difficulty: resource.difficulty,
      durationMinutes: resource.durationMinutes,
      rating: resource.rating,
      featured: resource.featured,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    };
  }

  private async seedResources() {
    const count = await this.resourceRepository.count();
    if (count > 0) return; // Already seeded

    const sampleResources = [
      {
        id: '1',
        title: 'Understanding Anxiety: A Complete Guide',
        description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
        content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can significantly impact your daily life. This comprehensive guide covers the different types of anxiety disorders, common symptoms like racing thoughts and physical tension, and practical coping strategies including breathing exercises, grounding techniques, and cognitive behavioral therapy approaches.',
        type: 'article',
        category: 'anxiety',
        difficulty: 'beginner',
        durationMinutes: 15,
        rating: 4.8,
        featured: true,
      },
      {
        id: '2',
        title: 'Guided Meditation for Depression',
        description: 'A 20-minute guided meditation specifically designed for managing depressive symptoms.',
        content: 'This meditation focuses on self-compassion and gentle awareness, helping you navigate difficult emotions with kindness. The session includes breathing exercises, body awareness, and loving-kindness practices specifically tailored for those experiencing depression.',
        type: 'audio',
        category: 'depression',
        difficulty: 'beginner',
        durationMinutes: 20,
        rating: 4.9,
        featured: true,
      },
      {
        id: 'kenya-befrienders',
        title: 'Befrienders Kenya',
        description: 'Provides emotional support to those in distress through confidential listening.',
        content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. Call: +254 722 178 177',
        type: 'contact',
        category: 'Crisis Support',
        difficulty: 'Easy',
        durationMinutes: 5,
        rating: 4.8,
        featured: true,
      },
    ];

    for (const resourceData of sampleResources) {
      const resource = this.resourceRepository.create(resourceData);
      await this.resourceRepository.save(resource);
    }
  }
}