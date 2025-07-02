export interface IStorageService {
  uploadObject(params: StorageUploadObjectParams): Promise<StorageObject>;
  downloadObject(key: string, containerName?: string): Promise<Buffer>;
  deleteObject(key: string, containerName?: string): Promise<void>;
  listObjects(
    prefix?: string,
    containerName?: string,
  ): Promise<StorageObject[]>;
}

export interface StorageObject {
  key: string;
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
