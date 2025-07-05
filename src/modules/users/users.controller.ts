import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserTagRequest } from './models/requests/create-user-tag.request';
import { DeleteUserTagRequest } from './models/requests/delete-user-tag.request';
import { GetUserTagsRequest } from './models/requests/get-user-tags.request';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/tags')
  getUserTags(@Param() params: GetUserTagsRequest) {
    return this.usersService.getUserTags(params);
  }

  @Post(':userId/tags')
  createUserTag(
    @Param() params: GetUserTagsRequest,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: CreateUserTagRequest,
  ) {
    const request: CreateUserTagRequest = { ...body, userId: params.userId };
    return this.usersService.createUserTag(request);
  }

  @Delete(':userId/tags/:tagId')
  deleteUserTag(@Param() params: DeleteUserTagRequest) {
    return this.usersService.deleteUserTag(params);
  }
}
