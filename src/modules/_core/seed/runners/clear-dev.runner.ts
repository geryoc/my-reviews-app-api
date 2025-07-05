import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../app.module';
import { DevDataSeeder } from '../seeders/dev-data-seeder.service';

async function clearDevRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const devSeeder = app.get(DevDataSeeder);
  await devSeeder.clear();
  console.log('🗑️ Dev data cleared');
  await app.close();
}

clearDevRunner().catch((error) => {
  console.error('❌ Dev clear failed:', error);
  process.exit(1);
});
