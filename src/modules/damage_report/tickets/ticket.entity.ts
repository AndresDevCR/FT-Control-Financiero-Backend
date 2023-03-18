import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { REPORT_DAMAGE_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'ticket' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column()
  location: string;

  @Column()
  email: string;

  @Column()
  category: number;

  @Column({ type: 'timestamp' })
  timestamp: number;
}
