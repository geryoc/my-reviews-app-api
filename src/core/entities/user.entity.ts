import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  pictureUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.user)
  tags: TagEntity[];
}
