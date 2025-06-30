import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MediaEntity } from './media.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryColumn({ type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'int', default: 99 })
  order: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  emoji?: string;

  @Column({ nullable: true })
  imageMediaId?: string;

  // Relationships

  @ManyToOne(() => MediaEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'imageMediaId' })
  imageMedia?: MediaEntity;
}
