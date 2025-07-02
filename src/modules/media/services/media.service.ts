import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STORAGE_SERVICE } from 'src/modules/_core/config/core-services.config';
import { getMediaExtension } from 'src/modules/_core/helpers/helpers';
import { Media } from 'src/modules/_core/models/media.model';
import { Repository } from 'typeorm';
import { MediaEntity } from '../../_core/entities/media.entity';
import { getMediaStorageKey as getMediaStorageObjectName } from '../../_core/enums/media-use-case.enum';
import {
  IStorageService,
  StorageObject,
  StorageUploadObjectParams,
} from '../../_core/services/storage/storage.service';
import { CreateMediaRequest } from '../models/requests/create-media.request';
import { GetMediaByIdRequest } from '../models/requests/get-media-by-id.request';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,
  ) {}

  async createMedia(request: CreateMediaRequest): Promise<Media> {
    const { base64Data, contentType, mediaUseCase, metadata, fileName } =
      request;

    const mediaId = crypto.randomUUID();
    const extension = getMediaExtension(fileName, contentType);
    const storageObjectName = getMediaStorageObjectName(
      mediaId,
      extension,
      mediaUseCase,
    );
    const storageContainerName = process.env.APP_MEDIA_DEFAULT_CONTAINER_NAME;
    const storageObjectBuffer = Buffer.from(base64Data, 'base64');

    const uploadParams: StorageUploadObjectParams = {
      objectName: storageObjectName,
      containerName: storageContainerName,
      buffer: storageObjectBuffer,
      contentType,
      metadata,
    };

    let storageObject: StorageObject | null = null;
    try {
      // Upload to S3 first
      storageObject = await this.storageService.uploadObject(uploadParams);

      // Create and save media entity
      const media = this.mediaRepository.create({
        mediaId,
        fileName,
        contentType,
        mediaUseCase,
        storageObjectName,
        storageContainerName,
        metadata,
        url: storageObject?.url,
        size: storageObject?.size,
      });

      return await this.mediaRepository.save(media);
    } catch (error) {
      // Rollback: delete the storage object if save to DB fails
      if (storageObject) {
        try {
          await this.storageService.deleteObject(
            storageObjectName,
            storageContainerName,
          );
        } catch (deleteError) {
          // Log the deletion error but don't throw it
          console.error(
            'Failed to delete S3 object during rollback:',
            deleteError,
          );
        }
      }
      throw error;
    }
  }

  async getMediaById(request: GetMediaByIdRequest): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: { mediaId: request.mediaId },
    });
    if (!media) {
      throw new NotFoundException(`Media with id ${request.mediaId} not found`);
    }
    return media;
  }

  async downloadMedia(request: GetMediaByIdRequest): Promise<Buffer> {
    const media = await this.getMediaById(request);
    return this.storageService.downloadObject(
      media.storageObjectName!,
      media.storageContainerName!,
    );
  }

  async getMediaAccessUrl(request: GetMediaByIdRequest): Promise<string> {
    const media = await this.getMediaById(request);
    return this.storageService.getObjectUrl(
      media.storageObjectName!,
      media.storageContainerName!,
    );
  }
}
