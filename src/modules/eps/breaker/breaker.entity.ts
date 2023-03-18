import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../../../const';
import { Panel } from '../panel/panel.entity';

@Entity({ schema, name: 'breaker' })
export class Breaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location_id: number;

  @Column()
  brand: string;

  @Column()
  type: string;

  @Column()
  caliber: string;

  @Column()
  position: string;

  @Column()
  panel_id: number;

  @Column()
  voltage_id: number;

  @Column()
  thread_id: number;

  @Column()
  phase_id: number;

  // created_at: timestamp;
  @Column({ type: 'timestamp' })
  created_at: number;

  @Column({ type: 'timestamp' })
  updated_at: number;

  @ManyToOne(() => Panel, (panel) => panel.breakers)
  @JoinColumn({ name: 'panel_id' })
  panel: Panel[];
}
