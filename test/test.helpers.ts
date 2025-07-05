import { INestApplication } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

export async function truncateTables(app: INestApplication) {
  const dataSource = app.get(getDataSourceToken());
  // Disable triggers (including foreign key triggers)
  await dataSource.query('SET session_replication_role = replica;');

  await dataSource.query('TRUNCATE TABLE review_tag RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE review RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE tag RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE category RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE media RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;');

  // Re-enable triggers
  await dataSource.query('SET session_replication_role = DEFAULT;');
}
