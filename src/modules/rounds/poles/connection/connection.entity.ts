import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_POLES as schema } from '../../../../const';
@Entity({ schema, name: 'connection' })
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_active: boolean;
}
