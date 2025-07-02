import { S3MediaStorageService } from '../services/storage/storage-implementation-s3.service';

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');

export const coreServicesProviders = [
  {
    provide: STORAGE_SERVICE,
    useClass: S3MediaStorageService,
  },
];

export const coreServicesExports = [STORAGE_SERVICE];
