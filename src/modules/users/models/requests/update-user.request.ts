import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  profilePictureMediaId?: string;
}
