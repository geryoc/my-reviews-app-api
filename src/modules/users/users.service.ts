import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../_core/entities/tag.entity';
import { UserEntity } from '../_core/entities/user.entity';
import { Tag } from '../_core/models/tag.model';
import { CreateUserTagRequest } from './models/requests/create-user-tag.request';
import { DeleteUserTagRequest } from './models/requests/delete-user-tag.request';
import { GetUserTagsRequest } from './models/requests/get-user-tags.request';
import { CreateUserTagResponse } from './models/responses/create-user-tag.response';
import { DeleteUserTagResponse } from './models/responses/delete-user-tag.response';
import { GetUserTagsResponse } from './models/responses/get-user-tags.response';

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

  private toTagModel(entity: TagEntity): Tag {
    return {
      tagId: entity.tagId,
      userId: entity.userId,
      name: entity.name,
    };
  }
}
