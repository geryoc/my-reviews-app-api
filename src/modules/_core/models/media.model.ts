import { MediaUseCase } from '../enums/media-use-case.enum';

export class Media {
  mediaId: string;
  fileName: string;
  contentType: string;
  mediaUseCase: MediaUseCase;
  storageObjectName: string;
  storageContainerName: string;
  url: string;
  size?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
