import { ELECTRICAL_TRANSFORMER as schema } from '../../../../const';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema, name: 'note' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  user_id: number;

  @Column()
  transformer_id: number;

  @Column()
  created_at: Date;
}
