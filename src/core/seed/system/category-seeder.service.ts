import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { SeederService } from '../seeder.service';

@Injectable()
export class CategorySeederService implements SeederService {
  private readonly logger = new Logger(CategorySeederService.name);

  private readonly seedData: CategoryEntity[] = [
    {
      categoryId: 1,
      name: 'Generic',
      emoji: '🗂️',
      description: 'Generic Review. Don’t fit other categories',
      order: 0,
    },
    {
      categoryId: 2,
      name: 'Restaurants',
      emoji: '🍽️',
      description: 'Dining out reviews',
      order: 1,
    },
    {
      categoryId: 3,
      name: 'Hotels',
      emoji: '🏨',
      description: 'Hotel stays, service, value',
      order: 2,
    },
    {
      categoryId: 4,
      name: 'Food Recipes',
      emoji: '🍲',
      description: 'Recipes you’ve tried or created',
      order: 3,
    },
    {
      categoryId: 5,
      name: 'Coffee Shops',
      emoji: '☕',
      description: 'Cafés, specialty coffee',
      order: 4,
    },
    {
      categoryId: 6,
      name: 'Movies',
      emoji: '🎬',
      description: 'Films in theaters or streaming',
      order: 5,
    },
    {
      categoryId: 7,
      name: 'TV Shows / Series',
      emoji: '📺',
      description: 'Episodic content',
      order: 6,
    },
    {
      categoryId: 8,
      name: 'Books',
      emoji: '📚',
      description: 'Fiction, non-fiction, ebooks',
      order: 7,
    },
    {
      categoryId: 9,
      name: 'Music / Albums / Songs',
      emoji: '🎵',
      description: 'Tracks, albums, concerts',
      order: 8,
    },
    {
      categoryId: 10,
      name: 'Products',
      emoji: '🛍️',
      description: 'Gadgets, purchases, tech, etc.',
      order: 9,
    },
    {
      categoryId: 11,
      name: 'Places / Travel',
      emoji: '🧳',
      description: 'Destinations, trips, attractions',
      order: 10,
    },
    {
      categoryId: 12,
      name: 'Live Shows',
      emoji: '🎭',
      description: 'Events, Plays, musicals, comedy shows',
      order: 11,
    },
    {
      categoryId: 13,
      name: 'Games',
      emoji: '🎮',
      description: 'Console, PC, mobile, tabletop',
      order: 12,
    },
    {
      categoryId: 14,
      name: 'Services',
      emoji: '💼',
      description: 'Subscriptions, consultants, etc.',
      order: 13,
    },
    {
      categoryId: 15,
      name: 'Personal Experiences / Moments',
      emoji: '📝',
      description: 'Reflective or life events, journals, etc',
      order: 14,
    },
  ];

  private repository: Repository<CategoryEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(CategoryEntity);
  }

  async seed(): Promise<void> {
    for (const item of this.seedData) {
      const existing = await this.repository.findOneBy({
        categoryId: item.categoryId,
      });

      if (existing) {
        await this.repository.save({ ...existing, ...item });
        this.logger.debug(
          `✔️ ${CategorySeederService.name} - Updated: ${item.name}`,
        );
      } else {
        await this.repository.save(this.repository.create(item));
        this.logger.debug(
          `➕ ${CategorySeederService.name} - Inserted: ${item.name}`,
        );
      }
    }

    this.logger.log(`✅ ${CategorySeederService.name} - completed`);
  }

  async clear(): Promise<void> {
    await this.repository.clear();
    this.logger.warn(`⚠️ ${CategorySeederService.name} - cleared`);
  }
}
