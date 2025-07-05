import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ReviewEntity } from './review.entity';
import { TagEntity } from './tag.entity';

@Entity('review_tag')
@Unique(['review', 'tag'])
export class ReviewTagEntity {
  @PrimaryGeneratedColumn()
  reviewTagId: number;

  @Column()
  reviewId: number;

  @Column()
  tagId: number;

  // Relationships

  @ManyToOne(() => ReviewEntity, (review) => review.reviewTags, {
    onDelete: 'CASCADE', // "If the parent record is deleted, delete this child record automatically as well."
  })
  @JoinColumn({ name: 'reviewId' })
  review: ReviewEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.reviewTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tagId' })
  tag: TagEntity;
}
