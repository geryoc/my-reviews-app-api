import { IsInt, Min } from 'class-validator';

export class DeleteUserRequest {
  @IsInt()
  @Min(1)
  userId: number;
}
