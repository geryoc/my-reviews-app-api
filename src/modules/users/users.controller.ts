import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserTagRequest } from './models/requests/create-user-tag.request';
import { DeleteUserTagRequest } from './models/requests/delete-user-tag.request';
import { GetUserTagsRequest } from './models/requests/get-user-tags.request';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/tags')
  getUserTags(@Param('userId', ParseIntPipe) userId: number) {
    const params: GetUserTagsRequest = { userId };
    return this.usersService.getUserTags(params);
  }

  @Post(':userId/tags')
  createUserTag(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: CreateUserTagRequest,
  ) {
    const request: CreateUserTagRequest = { ...body, userId };
    return this.usersService.createUserTag(request);
  }

  @Delete(':userId/tags/:tagId')
  deleteUserTag(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    const params: DeleteUserTagRequest = { userId, tagId };
    return this.usersService.deleteUserTag(params);
  }
}
