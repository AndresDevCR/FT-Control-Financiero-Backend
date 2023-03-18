import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { REPORT_DAMAGE_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  ticket_id: number;
}
