import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from '../src/app.module';
import { SystemDataSeeder } from '../src/modules/_core/seed/seeders/system-data-seeder.service';

dotenv.config({ path: '.env.test.local' });

module.exports = async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();

  // Run system data seeder to populate system tables (e.g., categories)
  try {
    const systemDataSeeder = app.get(SystemDataSeeder);
    if (systemDataSeeder && typeof systemDataSeeder.seed === 'function') {
      await systemDataSeeder.seed();
    }
  } catch (err) {
    // Log and continue if not found
    console.warn('SystemDataSeeder not found or failed:', err.message);
  }

  await app.close();
};
