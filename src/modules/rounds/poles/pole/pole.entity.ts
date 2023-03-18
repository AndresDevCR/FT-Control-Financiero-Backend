import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_POLES as schema } from '../../../../const';

@Entity({ schema, name: 'pole' })
export class Pole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  type: string;

  @Column()
  area: string;

  @Column()
  assignee: string;

  @Column()
  series: string;

  @Column()
  label: string;

  @Column()
  location_id: number;
}
