import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TestDataSeeder } from '../../src/modules/_core/seed/seeders/test-data-seeder.service';
import { truncateTables } from '../code/test.helpers';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userId: number;
  let tagId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await truncateTables(app);
    const testDataSeeder = app.get(TestDataSeeder);
    if (testDataSeeder && typeof testDataSeeder.seed === 'function') {
      await testDataSeeder.seed();
    }
    userId = 1;
  });

  it('should create a user tag', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/users/${userId}/tags`)
      .send({ name: 'TestTag' })
      .expect(201);

    tagId = res.body.tag.tagId;
    expect(res.body.tag.name).toBe('TestTag');
    expect(res.body.tag.userId).toBe(userId);
  });

  it('should get user tags', async () => {
    // Create a tag first
    const createRes = await request(app.getHttpServer())
      .post(`/api/users/${userId}/tags`)
      .send({ name: 'TestTag' })
      .expect(201);
    tagId = createRes.body.tag.tagId;

    const res = await request(app.getHttpServer())
      .get(`/api/users/${userId}/tags`)
      .expect(200);

    expect(res.body.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ tagId, name: 'TestTag' }),
      ]),
    );
  });

  it('should delete user tag', async () => {
    // Create a tag first
    const createRes = await request(app.getHttpServer())
      .post(`/api/users/${userId}/tags`)
      .send({ name: 'TestTag' })
      .expect(201);
    tagId = createRes.body.tag.tagId;

    await request(app.getHttpServer())
      .delete(`/api/users/${userId}/tags/${tagId}`)
      .expect(200);

    // Confirm tag is deleted
    const res = await request(app.getHttpServer())
      .get(`/api/users/${userId}/tags`)
      .expect(200);
    expect(res.body.tags).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ tagId })]),
    );
  });
});
