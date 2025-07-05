import { IsInt, IsNotEmpty } from 'class-validator';

export class GetUserTagsRequest {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
