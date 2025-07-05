import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../app.module';
import { TestDataSeeder } from '../seeders/test-data-seeder.service';

async function clearTestRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const testSeeder = app.get(TestDataSeeder);
  await testSeeder.clear();
  console.log('🗑️ Test data cleared');
  await app.close();
}

clearTestRunner().catch((error) => {
  console.error('❌ Test clear failed:', error);
  process.exit(1);
});
