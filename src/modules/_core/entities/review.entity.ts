import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { MediaEntity } from './media.entity';
import { ReviewTagEntity } from './reviewtag.entity';
import { UserEntity } from './user.entity';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  reviewId: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', array: true, nullable: true })
  pros?: string[];

  @Column({ type: 'text', array: true, nullable: true })
  cons?: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link?: string;

  @Column({ type: 'boolean', default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  imageMediaId?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relationships

  @ManyToOne(() => UserEntity, (user) => user.reviews, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => ReviewTagEntity, (reviewTag) => reviewTag.review, {
    cascade: true,
    eager: true,
  })
  reviewTags: ReviewTagEntity[];

  @ManyToOne(() => MediaEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'imageMediaId' })
  imageMedia?: MediaEntity;
}
