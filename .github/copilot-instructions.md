# Code Guidelines

# Tech Stack and Libraries

# MyReviews API Code Guidelines

## 1. Project Structure & Modules

- **src/**: Main source code directory.
  - **app.module.ts**: Root NestJS module.
  - **modules/**: Feature modules, grouped by domain (e.g., `_core`, `media`, `users`).
    - **\_core/**: Core/shared logic, entities, enums, helpers, config, seeders, and services used across modules.
      - **auth/**: Authentication strategies and guards.
      - **config/**: Configuration files for services, database, and entities.
      - **entities/**: TypeORM entities (e.g., `UserEntity`, `ReviewEntity`).
      - **enums/**: Shared enums (e.g., `EntityType`, `MediaUseCase`).
      - **helpers/**: Utility/helper functions.
      - **models/**: Shared models (not DB entities). General shared models and mappings from entities.
      - **seed/**: Seeder logic for system and dev data.
      - **services/**: Core service interfaces and implementations (e.g., storage, identity provider).
    - **media/**: Media Module upload/access logic (controllers, services, requests, responses).
    - **users/**: User module and tag management (controllers, services, requests, responses).
  - **main.ts**: Application bootstrap and global config.
- **test/**: E2E and unit tests.
- **docs/**: Documentation (this file, TODOs, guidelines, project detail, etc).

## 2. Naming Conventions

- **Files**: Use `kebab-case` for filenames (e.g., `media.service.ts`, `create-media.request.ts`).
- **Classes**:
  - Entities: `PascalCase` + `Entity` suffix (e.g., `UserEntity`, `ReviewEntity`).
  - Requests/Responses: `PascalCase` + `Request`/`Response` suffix (e.g., `CreateMediaRequest`).
  - Services: `PascalCase` + `Service` suffix (e.g., `MediaService`).
  - Controllers: `PascalCase` + `Controller` suffix (e.g., `MediaController`).
  - Enums: `PascalCase` (e.g., `MediaUseCase`).
- **Variables/Properties**: `camelCase`.
- **Constants**: `UPPER_SNAKE_CASE`.

## 3. Coding Standards

- **Language**: TypeScript (strict mode, ES2023 target).
- **Framework**: NestJS (modular, dependency injection, decorators).
- **ORM**: TypeORM (entities, repositories, relations). Not using migrations.
- **Validation**: Use `class-validator` decorators for DTOs/requests models.
- **Formatting**: Prettier (`.prettierrc`), enforced via ESLint (`eslint.config.mjs`).
- **Linting**: ESLint with TypeScript and Prettier plugins. Run `npm run lint` before commits.
- **Error Handling**: Use NestJS exceptions (e.g., `NotFoundException`, `UnauthorizedException`).
- **Swagger/OpenAPI**: Use decorators for API docs in controllers.

## 4. Entities & Models

- **Entities**: Decorated with `@Entity`, mapped to DB tables. Use `PrimaryGeneratedColumn`/`PrimaryColumn` for IDs. Use `@Column`, `@ManyToOne`, `@OneToMany`, etc. for fields and relations.
  - Example: `UserEntity`, `ReviewEntity`, `CategoryEntity`, etc. Must have suffix `Entity`.
- **Models**: Used for business logic/data transfer, not persisted directly (e.g., `Media`). These models are shared for all modules and are mappings from Entities.
- **Enums**: For fixed sets of values (e.g., `MediaUseCase`, `EntityType`).

## 5. DTOs, Requests & Responses

- **Request/Response Models DTOs**: For API and Services input/output (e.g., `CreateMediaRequest`, `DownloadMediaResponse`). All the models used as input/output of Services in the corresponding feature module. The same Request/Response models used in Services are also used in Controllers. The general shared resource/response models that map from entities like `Media` goes in /\_core/models like /\_core/models/media.model.ts. The requests response models goes into folder /modules/{modulename}/models/requests and /modules/{modulename}/models/responses
- **Validation**: Always validate incoming data on request models using class-validator.

## 6. Services & Controllers

- **Dependency**: Each Controller must use one and only one Service. A dedicated service must be created for each controller. This service must be only used in Controllers, and generally by only one controller. Then a service can use other services from core module (CoreModule) but can't use services from other feature modules.
- **Services**: Business logic, injected via constructor. Suffix with `Service`.
- **Controllers**: Route handlers, use decorators for HTTP methods and Swagger docs. Suffix with `Controller`.
- **Guards**: For authentication/authorization (e.g., `JwtAuthGuard`).

## 7. Configuration & Environment

- Use `.env` files for environment variables. See `.env-template` for required keys.
- Use `ConfigService` for accessing config in code.
- Database config in `database.config.ts`.

## 8. Seeders

- Place seeders in `src/modules/_core/seed/`.
- Use `SeederService` interface for all seeders.
- Separate system and dev seeders (`system/`, `dev/`).
- System seeders add required data for the system to work, like categories.
- Dev seeders create disposable data only for testing purposes in test environments
- Run with `npm run seed:run`.

## 9. Testing

- Place E2E tests in `test/`.
- Use Jest for unit and E2E tests.
- Run tests with `npm run test`, `npm run test:e2e`.

## 10. General Best Practices

### Modules

- Keep modules focused and decoupled.
- One module for each feature.
- Shared elements between features and general concerns go to CoreModule.

### Services

- One and only one Service for each Controller.
- Services can only use other services from CoreModule.
- In services, create one request model and one response model for each method.
- Each service operation/method must have one request model as input and one response model as output.
- The request and response models must be the same name of method + `Request` or `Response` suffix.
- Example getUser in UserService, GetUserRequest, GetUserResponse.
- Add validation using class-validator for the request models
- Use the shared models for resource responses like `Media`, `User` in \_core/models inside the Response models.
- Use dependency injection for all services.

### Controllers

- Use the same request and response models from the services as input/output of the controllers
- Use the shared models for resource responses like `Media`, `User` in \_core/models
- Validate al the parameters coming from @Param
- Document public APIs and important business logic using swagger.
- Keep controller logic thin; put business logic in services.
- Maps request objects directly from @Param and @Body using Requests DTOs

### General

- Prefer composition over inheritance.
- Use async/await for all async operations.
- Use TypeScript types, models dtos, and interfaces for clarity and safety.
- Private elements inside a class should be added after the public elemets. Example, all private methos after public methods.

---

_Refer to this document before contributing new code or refactoring._

# Test Guidelines

## 1. Test Type: End-to-End (E2E) Tests

- All tests should be E2E, covering the full stack (HTTP, validation, DB, etc.).
- Use [Supertest](https://github.com/visionmedia/supertest) with Jest to perform HTTP requests against the running NestJS app.

## 2. Test Database Setup

- **Use a separate database for tests** (e.g., `myreviews_app_local_test`).
- Add a new service to your `docker.compose.yaml` for a test Postgres DB.

- Configure your app to use this DB for tests by setting up a `.env.test.local` file with the correct DB connection string and any other test-specific env variables.

## 3. Seeding Test Data

- Use your **Test Data Seeder** to populate baseline data for all tests. This should only insert minimal, basic data required for the app to start and for tests to run.
- Only run the dev seeder in test/dev environments.
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
