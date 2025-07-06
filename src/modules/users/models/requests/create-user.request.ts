import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @Length(1, 255)
  authId: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  profilePictureMediaId?: string;
}
