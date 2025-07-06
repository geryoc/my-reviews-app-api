import { ReviewEntity } from '../entities/review.entity';
import { Media } from './media.model';
import { Tag } from './tag.model';

export class Review {
  reviewId: number;
  userId: number;
  title: string;
  categoryId: number;
  date: Date;
  description?: string;
  rating: number;
  pros?: string[];
  cons?: string[];
  location?: string;
  link?: string;
  isFavorite: boolean;
  imageMediaId?: string;
  createdAt: Date;
  updatedAt: Date;
  imageMedia?: Media;
  reviewTags?: Tag[];

  static fromEntity(entity: ReviewEntity): Review {
    const model = new Review();
    model.reviewId = entity.reviewId;
    model.userId = entity.userId;
    model.title = entity.title;
    model.categoryId = entity.categoryId;
    model.date = entity.date;
    model.description = entity.description;
    model.rating = entity.rating;
    model.pros = entity.pros;
    model.cons = entity.cons;
    model.location = entity.location;
    model.link = entity.link;
    model.isFavorite = entity.isFavorite;
    model.imageMediaId = entity.imageMediaId;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    model.imageMedia = entity.imageMedia
      ? Media.fromEntity(entity.imageMedia)
      : undefined;
    model.reviewTags = entity.reviewTags
      ? entity.reviewTags.map((t) => Tag.fromEntity(t.tag))
      : undefined;
    return model;
  }
}
