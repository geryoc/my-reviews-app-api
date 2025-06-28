import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('demo')
export class DemoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;
}
