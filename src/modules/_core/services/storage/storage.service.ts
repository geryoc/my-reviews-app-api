export interface IStorageService {
  uploadObject(params: StorageUploadObjectParams): Promise<StorageObject>;
  downloadObject(objectName: string, containerName?: string): Promise<Buffer>;
  deleteObject(objectName: string, containerName?: string): Promise<void>;
  listObjects(
    prefix?: string,
    containerName?: string,
  ): Promise<StorageObject[]>;
}

export interface StorageObject {
  objectName: string;
  containerName?: string;
  url: string;
  size?: number;
  contentType?: string;
}

export interface StorageUploadObjectParams {
  objectName: string;
  buffer: Buffer;
  containerName?: string;
  contentType?: string;
  metadata?: Record<string, string>;
}
