import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import {
  IStorageService,
  StorageObject,
  StorageUploadObjectParams,
} from './storage.service';

@Injectable()
export class S3MediaStorageService implements IStorageService {
  private s3Client: S3Client;

  private defaultBucketName: string = process.env.AWS_S3_DEFAULT_BUCKET_NAME!;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_S3_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadObject(
    params: StorageUploadObjectParams,
  ): Promise<StorageObject> {
    const bucketName = params.containerName || this.defaultBucketName;

    await this.s3Client.send(
      new PutObjectCommand({
        Key: params.objectName,
        Bucket: bucketName,
        Body: params.buffer,
        ContentType: params.contentType,
        Metadata: params.metadata,
      }),
    );

    const url = `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.objectName}`;

    return {
      key: params.objectName,
      containerName: bucketName,
      url,
      contentType: params.contentType,
      size: params.buffer.length,
    };
  }

  async downloadObject(key: string, containerName?: string): Promise<Buffer> {
    const res = await this.s3Client.send(
      new GetObjectCommand({
        Key: key,
        Bucket: containerName || this.defaultBucketName,
      }),
    );

    const stream = res.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

  async deleteObject(key: string, containerName?: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: containerName || this.defaultBucketName,
        Key: key,
      }),
    );
  }

  async listObjects(
    prefix?: string,
    containerName?: string,
  ): Promise<StorageObject[]> {
    const bucketName = containerName || this.defaultBucketName;

    const result = await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      }),
    );

    return (
      result.Contents?.map((obj) => ({
        key: obj.Key!,
        url: `https://${bucketName}.s3.amazonaws.com/${obj.Key}`,
        size: obj.Size,
      })) ?? []
    );
  }
}
