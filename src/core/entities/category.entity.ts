import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string;
}
