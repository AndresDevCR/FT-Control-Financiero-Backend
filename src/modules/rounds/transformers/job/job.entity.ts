import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_TRANSFORMER as schema } from '../../../../const';

@Entity({ schema, name: 'job' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  company: string;

  @Column()
  assigned: string;

  @Column()
  transformer_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
