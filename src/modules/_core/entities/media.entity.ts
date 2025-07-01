import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaUseCase } from '../enums/media-use-case.enum';

@Entity('media')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  mediaId: string;

  @Column({ nullable: true })
  contentType?: string;

  @Column({
    type: 'enum',
    enum: MediaUseCase,
  })
  mediaUseCase: MediaUseCase;

  @Column({ nullable: true })
  logicalName?: string;

  @Column({ nullable: true })
  physicalName?: string;

  @Column({ nullable: true })
  containerName?: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  size?: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
