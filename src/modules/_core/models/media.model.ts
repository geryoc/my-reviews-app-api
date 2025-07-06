import { MediaEntity } from '../entities/media.entity';
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

  static fromEntity(entity: MediaEntity): Media {
    const model = new Media();
    model.mediaId = entity.mediaId;
    model.fileName = entity.fileName;
    model.contentType = entity.contentType;
    model.mediaUseCase = entity.mediaUseCase;
    model.storageObjectName = entity.storageObjectName;
    model.storageContainerName = entity.storageContainerName;
    model.url = entity.url;
    model.size = entity.size;
    model.metadata = entity.metadata;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    return model;
  }
}
