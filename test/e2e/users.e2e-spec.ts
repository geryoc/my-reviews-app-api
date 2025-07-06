import { TestAppManager } from '../code/test-app-manager';

describe('UsersController (e2e)', () => {
  let testApp: TestAppManager;
  let userId: number;

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
    const res = await testApp.sendRequest('post', `/api/users/${userId}/tags`, {
      name: 'TestTagCreated',
    });

    expect(res.status).toBe(201);
    expect(res.body.tag.name).toBe('TestTagCreated');
    expect(res.body.tag.userId).toBe(userId);
  });

  it('should get user tags', async () => {
    const response = await testApp.sendRequest(
      'get',
      `/api/users/${userId}/tags`,
    );

    expect(response.status).toBe(200);
    expect(response.body.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'TestTag', tagId: 1, userId: 1 }),
      ]),
    );
  });

  it('should delete user tag', async () => {
    const createRes = await testApp.sendRequest(
      'post',
      `/api/users/${userId}/tags`,
      {
        name: 'DeleteTestTag',
      },
    );

    expect(createRes.status).toBe(201);
    const deleteTagId = createRes.body.tag.tagId;

    const deleteRes = await testApp.sendRequest(
      'delete',
      `/api/users/${userId}/tags/${deleteTagId}`,
    );
    expect(deleteRes.status).toBe(200);

    const getRes = await testApp.sendRequest(
      'get',
      `/api/users/${userId}/tags`,
    );
    expect(getRes.status).toBe(200);
    expect(getRes.body.tags).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ tagId: deleteTagId })]),
    );
  });
});
