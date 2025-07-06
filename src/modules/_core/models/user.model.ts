import { ReviewEntity } from '../entities/review.entity';
import { TagEntity } from '../entities/tag.entity';
import { UserEntity } from '../entities/user.entity';

export class User {
  userId: number;
  authId: string;
  email?: string;
  name?: string;
  profilePictureMediaId?: string;
  createdAt: Date;
  updatedAt: Date;
  reviews?: ReviewEntity[];
  tags?: TagEntity[];

  static fromEntity(entity: UserEntity): User {
    const model = new User();
    model.userId = entity.userId;
    model.authId = entity.authId;
    model.email = entity.email;
    model.name = entity.name;
    model.profilePictureMediaId = entity.profilePictureMediaId;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    model.reviews = entity.reviews;
    model.tags = entity.tags;
    return model;
  }

  static toEntity(model: User): UserEntity {
    const entity = new UserEntity();
    entity.userId = model.userId;
    entity.authId = model.authId;
    entity.email = model.email;
    entity.name = model.name;
    entity.profilePictureMediaId = model.profilePictureMediaId;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    if (model.reviews) {
      entity.reviews = model.reviews;
    }
    if (model.tags) {
      entity.tags = model.tags;
    }
    return entity;
  }
}
