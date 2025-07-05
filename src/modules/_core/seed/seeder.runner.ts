import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { DevDataSeeder } from './seeders/dev-data-seeder.service';
import { SystemDataSeeder } from './seeders/system-data-seeder.service';

async function seederRunner() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const runSystemSeeder = process.env.SEED_SYSTEM === 'true';
  const runDevSeeder = process.env.SEED_DEV === 'true';

  if (runSystemSeeder) {
    const systemSeeder = app.get(SystemDataSeeder);
    await systemSeeder.seed();
    console.log('✅ System data seeded');
  }

  if (runDevSeeder) {
    const devSeeder = app.get(DevDataSeeder);
    await devSeeder.seed();
    console.log('✅ Dev data seeded');
  }

  await app.close();
}

seederRunner().catch((error) => {
  console.error('❌ Seeder failed:', error);
  process.exit(1);
});
