import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../app.module';
import { SystemDataSeeder } from '../seeders/system-data-seeder.service';

async function clearSystemRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const systemSeeder = app.get(SystemDataSeeder);
  await systemSeeder.clear();
  console.log('🗑️ System data cleared');
  await app.close();
}

clearSystemRunner().catch((error) => {
  console.error('❌ System clear failed:', error);
  process.exit(1);
});
