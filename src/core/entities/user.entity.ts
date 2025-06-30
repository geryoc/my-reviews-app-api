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
import { MediaEntity } from './media.entity';
import { ReviewEntity } from './review.entity';
import { TagEntity } from './tag.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  authId: string; // Auth0 sub ID

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ length: 255, nullable: true })
  name?: string;

  @Column({ nullable: true })
  profilePictureMediaId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.user)
  tags: TagEntity[];

  @ManyToOne(() => MediaEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'profilePictureMediaId' })
  profilePictureMedia?: MediaEntity;
}
