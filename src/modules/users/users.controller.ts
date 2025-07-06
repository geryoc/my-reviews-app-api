import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../_core/auth/jwt.guard';
import { CreateUserTagRequest } from './models/requests/create-user-tag.request';
import { CreateUserRequest } from './models/requests/create-user.request';
import { DeleteUserTagRequest } from './models/requests/delete-user-tag.request';
import { DeleteUserRequest } from './models/requests/delete-user.request';
import { GetUserTagsRequest } from './models/requests/get-user-tags.request';
import { GetUserRequest } from './models/requests/get-user.request';
import { UpdateUserRequest } from './models/requests/update-user.request';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const request: GetUserRequest = { userId };
    return this.usersService.getUserById(request);
  }

  @Post()
  createUser(@Body() body: CreateUserRequest) {
    return this.usersService.createUser(body);
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserRequest,
  ) {
    return this.usersService.updateUser(userId, body);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    const request: DeleteUserRequest = { userId };
    return this.usersService.deleteUser(request);
  }

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
