import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../_core/entities/tag.entity';
import { UserEntity } from '../_core/entities/user.entity';
import { Tag } from '../_core/models/tag.model';
import { User } from '../_core/models/user.model';
import { CreateUserTagRequest } from './models/requests/create-user-tag.request';
import { CreateUserRequest } from './models/requests/create-user.request';
import { DeleteUserTagRequest } from './models/requests/delete-user-tag.request';
import { DeleteUserRequest } from './models/requests/delete-user.request';
import { GetUserTagsRequest } from './models/requests/get-user-tags.request';
import { GetUserRequest } from './models/requests/get-user.request';
import { UpdateUserRequest } from './models/requests/update-user.request';
import { CreateUserTagResponse } from './models/responses/create-user-tag.response';
import { CreateUserResponse } from './models/responses/create-user.response';
import { DeleteUserTagResponse } from './models/responses/delete-user-tag.response';
import { DeleteUserResponse } from './models/responses/delete-user.response';
import { GetUserTagsResponse } from './models/responses/get-user-tags.response';
import { GetUserResponse } from './models/responses/get-user.response';
import { UpdateUserResponse } from './models/responses/update-user.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserTags(request: GetUserTagsRequest): Promise<GetUserTagsResponse> {
    const tags = await this.tagRepository.find({
      where: { userId: request.userId },
    });
    return { tags: tags.map(this.toTagModel) };
  }

  async createUserTag(
    request: CreateUserTagRequest,
  ): Promise<CreateUserTagResponse> {
    const user = await this.userRepository.findOne({
      where: { userId: request.userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const tag = this.tagRepository.create({
      userId: request.userId,
      name: request.name,
    });
    const saved = await this.tagRepository.save(tag);
    return { tag: this.toTagModel(saved) };
  }

  async deleteUserTag(
    request: DeleteUserTagRequest,
  ): Promise<DeleteUserTagResponse> {
    const tag = await this.tagRepository.findOne({
      where: { tagId: request.tagId, userId: request.userId },
    });
    if (!tag) throw new NotFoundException('Tag not found for this user');
    await this.tagRepository.remove(tag);
    return { success: true };
  }

  async getUserById(request: GetUserRequest): Promise<GetUserResponse> {
    const userEntity = await this.userRepository.findOne({
      where: { userId: request.userId },
    });
    if (!userEntity) throw new NotFoundException('User not found');
    return { user: User.fromEntity(userEntity) };
  }

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    const newUserEntity = this.userRepository.create(request);
    const savedUserEntity = await this.userRepository.save(newUserEntity);
    return { user: User.fromEntity(savedUserEntity) };
  }

  async updateUser(
    userId: number,
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    let userEntity = await this.userRepository.findOne({ where: { userId } });
    if (!userEntity) throw new NotFoundException('User not found');
    Object.assign(userEntity, request);
    await this.userRepository.save(userEntity);
    userEntity = (await this.userRepository.findOne({ where: { userId } }))!;
    return { user: User.fromEntity(userEntity) };
  }

  async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const userResponse = await this.getUserById({ userId: request.userId });
    const userEntity = User.toEntity(userResponse.user);
    await this.userRepository.remove(userEntity);
    return { success: true };
  }

  private toTagModel(entity: TagEntity): Tag {
    return {
      tagId: entity.tagId,
      userId: entity.userId,
      name: entity.name,
    };
  }
}
