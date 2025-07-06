import { TestAppManager } from '../code/test-app-manager';

describe('AppController (e2e)', () => {
  let testApp: TestAppManager;

  beforeAll(async () => {
    testApp = new TestAppManager();
    await testApp.init();
  });

  afterAll(async () => {
    await testApp.close();
  });

  it('/ping (GET)', async () => {
    const res = await testApp.sendRequest('get', '/ping');

    expect(res.status).toBe(200);
    expect(res.text).toBe('Pong!');
  });
});
