import * as request from 'supertest';
import { TestAppManager } from '../code/test-app-manager';

describe('UsersController (e2e)', () => {
  let testApp: TestAppManager;
  let userId: number;
  let tagId: number;

  beforeAll(async () => {
    testApp = new TestAppManager();
    await testApp.init();
  });

  afterAll(async () => {
    await testApp.close();
  });

  beforeEach(async () => {
    await testApp.clearDb();
    await testApp.seedTestData();
    userId = testApp.defaultUserId;
  });

  it('should create a user tag', async () => {
    const res = await request(testApp.app.getHttpServer())
      .post(`/api/users/${userId}/tags`)
      .send({ name: 'TestTagCreated' })
      .expect(201);

    expect(res.body.tag.name).toBe('TestTagCreated');
    expect(res.body.tag.userId).toBe(userId);
  });

  it('should get user tags', async () => {
    const res = await request(testApp.app.getHttpServer())
      .get(`/api/users/${userId}/tags`)
      .expect(200);

    expect(res.body.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'TestTag', tagId: 1, userId: 1 }),
      ]),
    );
  });

  it('should delete user tag', async () => {
    // Create a tag to delete first
    const createResponse = await request(testApp.app.getHttpServer())
      .post(`/api/users/${userId}/tags`)
      .send({ name: 'DeleteTestTag' })
      .expect(201);
    const deleteTagId = createResponse.body.tag.tagId;

    await request(testApp.app.getHttpServer())
      .delete(`/api/users/${userId}/tags/${deleteTagId}`)
      .expect(200);

    // Confirm tag is deleted
    const res = await request(testApp.app.getHttpServer())
      .get(`/api/users/${userId}/tags`)
      .expect(200);
    expect(res.body.tags).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ tagId: deleteTagId })]),
    );
  });
});
