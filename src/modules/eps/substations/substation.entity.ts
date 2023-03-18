import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'substation' })
export class Substation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  location_id: number;

  @Column()
  from_to: string;

  @Column()
  goes_to: string;

  @Column()
  transformer_id: number;

  @Column()
  bus: string;

  @Column()
  model: string;

  @Column()
  main: string;

  @Column()
  number_of_breakers: number;

  @Column()
  emergency_panel: boolean;

  @Column()
  voltage_id: number;

  @Column()
  thread_id: number;

  @Column()
  phase_id: number;

  @Column('text', { nullable: true })
  phase_description: string;

  @Column('text', { nullable: true })
  neutral: string;

  @Column('text', { nullable: true })
  ground: string;
}
