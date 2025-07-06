import { TagEntity } from '../entities/tag.entity';

export class Tag {
  tagId: number;
  userId: number;
  name: string;

  static fromEntity(entity: TagEntity): Tag {
    const model = new Tag();
    model.tagId = entity.tagId;
    model.userId = entity.userId;
    model.name = entity.name;
    return model;
  }
}
