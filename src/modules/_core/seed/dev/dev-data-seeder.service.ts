import { Injectable } from '@nestjs/common';
import { SeederService } from '../seeder.service';

@Injectable()
export class DevDataSeeder implements SeederService {
  constructor() {}

  async seed(): Promise<void> {
    // Add DEV data seeders for testing purposes.
    // For example, UserSeederService, ReviewSeederService, etc.
  }
}

export const devSeeders = [DevDataSeeder];
