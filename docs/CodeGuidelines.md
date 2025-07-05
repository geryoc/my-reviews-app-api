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
