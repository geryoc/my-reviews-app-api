import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetMediaByIdRequest {
  @IsNotEmpty()
  @IsUUID()
  mediaId: string;
}
