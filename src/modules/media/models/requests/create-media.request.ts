import {
  IsBase64,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { MediaUseCase } from 'src/modules/_core/enums/media-use-case.enum';

export class CreateMediaRequest {
  @IsDefined()
  @IsString()
  @IsBase64()
  base64Data: string;

  @IsDefined()
  @IsString()
  fileName: string;

  @IsDefined()
  @IsString()
  contentType: string;

  @IsDefined()
  @IsEnum(MediaUseCase)
  mediaUseCase: MediaUseCase;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
