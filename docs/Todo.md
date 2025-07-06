# Backend

- [x] Create backend repo github
- [x] Init proj npm and init nest js
- [x] Add docker local postgre database
- [x] Add env files
- [x] Config typeorm with data source auto sync from entities
- [x] Add some entity to test the auto sync database
- [x] Add core module with all the entities
- [x] Add media entities (Media) using enums (MediaUseCase)
- [x] Add seeder for system data and scalable seeder structure
- [x] Add seeder for dev data and script to run dev seeders
- [x] Define and integrate media storage - Start with s3 deployed store (to try aws) and then use minio for local dev
- [x] Add endpoint POST /media/upload, and GET media/:id and then GET media/download (Analyze)
- [x] Add Open API documentation generation
- [x] Analyze how to handle rollback of created medias ?? how twitter/facebook api handles this ?? implement rollback mechanism
- [x] Auth - Analyze Auth providers auth0 vs aws -> Decision AWS Cognito
- [x] Auth - Add auth module sign up / sign in - integrate auth provider (AWS COGNITO)
- [x] Auth - Add auth validation in controllers and security
- [x] Add user module with tag crud

- [x] Complete automation e2e test setup with test db, best practices, better design, auth, etc

- [ ] Add review module with crud

- [ ] Add Exception handling middlewares (not priority)
- [ ] Add Validation middlewares (not priority)
- [ ] Add Not found middlewares (not priority)

# Frontend

- [ ] set up react proj, libraries, config, env variables
- [ ] add auth module with sign in, sign up, sign out and add basic app layout
