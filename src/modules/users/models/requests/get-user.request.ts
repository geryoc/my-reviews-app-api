import { IsInt, Min } from 'class-validator';

export class GetUserRequest {
  @IsInt()
  @Min(1)
  userId: number;
}
