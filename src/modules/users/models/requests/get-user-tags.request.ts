import { IsDefined, IsInt, IsNotEmpty } from 'class-validator';

export class GetUserTagsRequest {
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  userId: number;
}
