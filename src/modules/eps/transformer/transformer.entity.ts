import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'transformer' })
export class Transformer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  main: string;

  @Column()
  area: string;

  @Column()
  zone: string;

  @Column()
  from_to: string;

  @Column()
  voltage_id: number;

  @Column()
  model: string;

  @Column()
  disconnector_id: number;
}
