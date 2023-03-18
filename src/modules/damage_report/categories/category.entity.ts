import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { REPORT_DAMAGE_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  display_name: string;
}
