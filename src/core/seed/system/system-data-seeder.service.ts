import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.service';
import { CategorySeederService } from './category-seeder.service';

@Injectable()
export class SystemDataSeeder implements SeederService {
  constructor(private readonly categorySeeder: CategorySeederService) {}

  async seed(): Promise<void> {
    await this.categorySeeder.seed();
  }
}

export const systemSeeders = [SystemDataSeeder, CategorySeederService];
