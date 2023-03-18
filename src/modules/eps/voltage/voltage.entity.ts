import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../../../const';
@Entity({ schema, name: 'voltage' })
export class Voltage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  value: string;
}
