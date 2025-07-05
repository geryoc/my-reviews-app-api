import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTagRequest {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
