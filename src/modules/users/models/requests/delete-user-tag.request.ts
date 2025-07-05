import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteUserTagRequest {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  tagId: number;
}
