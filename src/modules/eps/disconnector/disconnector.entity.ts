import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'disconnector' })
export class Disconnector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  @Column()
  location_id: number;

  @Column({ nullable: true })
  from_to: string;

  @Column({ nullable: true })
  goes_to: string;

  @Column({ nullable: true })
  bus: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  main: string;

  @Column({ nullable: true })
  number_of_breakers: number;

  @Column({ nullable: true })
  emergency_panel: boolean;

  @Column({ nullable: true })
  voltage_id: number;

  @Column({ nullable: true })
  thread_id: number;

  @Column({ nullable: true })
  phase_id: number;

  @Column('text', { nullable: true })
  phase_description: string;

  @Column('text', { nullable: true })
  neutral: string;

  @Column('text', { nullable: true })
  ground: string;
}
