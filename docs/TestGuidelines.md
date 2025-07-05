# MyReviews API Test Guidelines

## 1. Test Type: End-to-End (E2E) Tests

- All tests should be E2E, covering the full stack (HTTP, validation, DB, etc.).
- Use [Supertest](https://github.com/visionmedia/supertest) with Jest to perform HTTP requests against the running NestJS app.

## 2. Test Database Setup

- **Use a separate database for tests** (e.g., `myreviews_app_local_test`).
- Add a new service to your `docker.compose.yaml` for a test Postgres DB.

- Configure your app to use this DB for tests by setting up a `.env.test.local` file with the correct DB connection string and any other test-specific env variables.

## 3. Seeding Test Data

- Use your **Test Data Seeder** to populate baseline data for all tests. This should only insert minimal, basic data required for the app to start and for tests to run.
- Only run the test seeder in test/dev environments.
- For test-specific data, create it directly in your test setup/teardown (e.g., inside `beforeEach`/`afterEach` blocks in your test files).

## 4. Writing E2E Test Cases

- Use Supertest to send HTTP requests to your API endpoints.
- Example test flow:
  1. Create a user (or use a seeded user).
  2. Create a tag for that user.
  3. Get tags for that user and assert the tag is present.
  4. Delete the tag and assert it's removed.
- Place E2E tests in the `test/` directory (e.g., `test/app.e2e-spec.ts`).
- Use Jest as the test runner.

## 5. Test Data Cleanup & Consistency

- **Avoid data inconsistency:**
  - Use a separate test DB (never run tests against dev/prod DB).
  - Truncate tables before/after each test, or use transactions and rollback to ensure a clean state.
  - Seed only what you need for each test.
  - Reset auto-increment IDs if needed (e.g., with `ALTER SEQUENCE ... RESTART WITH 1;`).
- Clean up test data after each test to avoid cross-test pollution.

## 6. Example E2E Test Skeleton

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

    // Optionally seed a user or use TestDataSeeder
    // userId = ...;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user tag', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/users/${userId}/tags`)
      .send({ name: 'TestTag' })
      .expect(201);

    tagId = res.body.tag.tagId;
    expect(res.body.tag.name).toBe('TestTag');
  });

  it('should get user tags', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/users/${userId}/tags`)
      .expect(200);

    expect(res.body.tags).toEqual(
      expect.arrayContaining([expect.objectContaining({ tagId })]),
    );
  });

  it('should delete user tag', async () => {
    await request(app.getHttpServer())
      .delete(`/api/users/${userId}/tags/${tagId}`)
      .expect(200);
  });
});
```

## 7. Environment Configuration

- Create a `.env.test.local` file with all environment variables needed for tests (DB connection, ports, etc.).
- Ensure your app loads `.env.test.local` when running tests (e.g., by setting `NODE_ENV=test`).

## 8. Best Practices

- Keep your test DB schema in sync with your main DB schema.
- Never run tests against dev/prod DBs.
- Use transactions or truncate tables to keep tests isolated.
- Use the dev seeder for baseline data, but create test-specific data in your test setup.
- Clean up after each test to avoid data leaks.
- Reset sequences/IDs if needed for predictable test results.

---

_Refer to this document before writing or updating tests for the MyReviews API._
