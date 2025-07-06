import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getCognitoAccessToken } from '../../src/modules/_core/helpers/cognito-token-helper';
import { TestDataSeeder } from '../../src/modules/_core/seed/seeders/test-data-seeder.service';

export class TestAppManager {
  public app: INestApplication;
  public defaultUserId: number = 1;

  async init() {
    await this.createApp();
    await this.app.init();
  }

  async close() {
    if (this.app) {
      await this.app.close();
    }
  }

  async clearDb() {
    if (this.app) {
      await this.truncateTables();
    }
  }

  async seedTestData() {
    if (this.app) {
      const testDataSeeder = this.app.get(TestDataSeeder);
      if (testDataSeeder && typeof testDataSeeder.seed === 'function') {
        await testDataSeeder.seed();
      }
    }
  }

  async sendRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    body?: unknown,
  ): Promise<request.Response> {
    const token = await getCognitoAccessToken();
    console.log('Generated Token:', token);

    const requestBuilder = request(this.app.getHttpServer())
      [method](url)
      .set('Authorization', `Bearer ${token}`);

    if (body && (method === 'post' || method === 'put')) {
      return requestBuilder.send(body).set('Content-Type', 'application/json');
    }

    return requestBuilder;
  }

  // Private methods

  private async createApp() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this.app = moduleFixture.createNestApplication();
  }

  private async truncateTables() {
    const dataSource = this.app.get(getDataSourceToken());

    // Disable FKs
    await dataSource.query('SET session_replication_role = replica;');

    await dataSource.query(
      'TRUNCATE TABLE review_tag RESTART IDENTITY CASCADE;',
    );
    await dataSource.query('TRUNCATE TABLE review RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE TABLE tag RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE TABLE category RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE TABLE media RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;');

    // Re-enable FKs
    await dataSource.query('SET session_replication_role = DEFAULT;');
  }
}
