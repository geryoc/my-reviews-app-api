import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import {
  IStorageService,
  StorageObject,
  StorageUploadObjectParams,
} from './storage.service';

@Injectable()
export class S3MediaStorageService implements IStorageService {
  private s3Client: S3Client;

  private readonly defaultBucketName: string;
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly accessKeySecret: string;
  private readonly defaultUrlExpirationSeconds: number;

  constructor(private readonly configService: ConfigService) {
    this.defaultBucketName = this.configService.get<string>(
      'AWS_S3_DEFAULT_BUCKET_NAME',
    )!;
    this.region = this.configService.get<string>('AWS_S3_REGION')!;
    this.accessKeyId = this.configService.get<string>('AWS_S3_ACCESS_KEY_ID')!;
    this.accessKeySecret = this.configService.get<string>(
      'AWS_S3_ACCESS_KEY_SECRET',
    )!;
    this.defaultUrlExpirationSeconds = this.configService.get<number>(
      'APP_MEDIA_DEFAULT_URL_EXPIRATION_SECONDS',
    )!;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.accessKeySecret,
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

    const url = `https://${bucketName}.s3.${this.region}.amazonaws.com/${params.objectName}`;

    return {
      objectName: params.objectName,
      containerName: bucketName,
      url,
      contentType: params.contentType,
      size: params.buffer.length,
    };
  }

  async downloadObject(
    objectName: string,
    containerName?: string,
  ): Promise<Buffer> {
    const res = await this.s3Client.send(
      new GetObjectCommand({
        Key: objectName,
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

  async deleteObject(
    objectName: string,
    containerName?: string,
  ): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: containerName || this.defaultBucketName,
        Key: objectName,
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
      result.Contents?.map((object) => ({
        objectName: object.Key!,
        containerName: bucketName,
        url: `https://${bucketName}.s3.amazonaws.com/${object.Key}`,
        size: object.Size,
      })) ?? []
    );
  }

  async getObjectUrl(
    objectName: string,
    containerName?: string,
    expiresInSeconds?: number,
  ): Promise<string> {
    const bucketName = containerName || this.defaultBucketName;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectName,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds || this.defaultUrlExpirationSeconds,
    });

    return signedUrl;
  }
}
