import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../app.module';
import { DevDataSeeder } from '../seeders/dev-data-seeder.service';

async function devSeederRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const devSeeder = app.get(DevDataSeeder);
  await devSeeder.seed();
  console.log('✅ Dev data seeded');
  await app.close();
}

devSeederRunner().catch((error) => {
  console.error('❌ Dev seeder failed:', error);
  process.exit(1);
});
