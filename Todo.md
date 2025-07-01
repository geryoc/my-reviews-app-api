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

- [ ] Add endpoint POST /media/upload, and GET media/:id and then GET media/download (Analyze)
- [ ] Analyze how to handle rollback of created medias ?? how twitter/facebook api handles this ??

- [ ] Analyze Auth providers auth0 vs aws vs firebase
- [ ] Add auth module sign up / sign in - integrate auth provider

- [ ] Add review module with crud

- [ ] Add Open API documentation generation

# Frontend

- [ ] set up react proj
- [ ] add env variables
- [ ] add login module, login signup screen
