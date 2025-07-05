import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../app.module';
import { TestDataSeeder } from '../seeders/test-data-seeder.service';

async function testSeederRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const testSeeder = app.get(TestDataSeeder);
  await testSeeder.seed();
  console.log('✅ Test data seeded');
  await app.close();
}

testSeederRunner().catch((error) => {
  console.error('❌ Test seeder failed:', error);
  process.exit(1);
});
