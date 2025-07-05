import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewTagEntity } from './reviewtag.entity';
import { UserEntity } from './user.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  tagId: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  // Relationships

  @ManyToOne(() => UserEntity, (user) => user.tags, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => ReviewTagEntity, (reviewTag) => reviewTag.tag)
  reviewTags: ReviewTagEntity[];
}
