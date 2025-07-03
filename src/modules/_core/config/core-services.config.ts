import { IdentityProviderService } from '../services/identity-provider/identity-provider-implementation.service';
import { S3MediaStorageService } from '../services/storage/storage-implementation-s3.service';

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');
export const IDENTITY_PROVIDER_SERVICE = Symbol('IDENTITY_PROVIDER_SERVICE');

export const coreServicesProviders = [
  {
    provide: STORAGE_SERVICE,
    useClass: S3MediaStorageService,
  },
  {
    provide: IDENTITY_PROVIDER_SERVICE,
    useClass: IdentityProviderService,
  },
];

export const coreServicesExports = [STORAGE_SERVICE, IDENTITY_PROVIDER_SERVICE];
