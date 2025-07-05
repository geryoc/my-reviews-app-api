import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../../app.module';
import { SystemDataSeeder } from '../seeders/system-data-seeder.service';

async function systemSeederRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const systemSeeder = app.get(SystemDataSeeder);
  await systemSeeder.seed();
  console.log('✅ System data seeded');
  await app.close();
}

systemSeederRunner().catch((error) => {
  console.error('❌ System seeder failed:', error);
  process.exit(1);
});
