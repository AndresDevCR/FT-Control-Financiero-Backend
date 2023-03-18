import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_POLES as schema } from '../../../../const';

@Entity({ schema, name: 'electric_facility' })
export class ElectricFacility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  board: string;

  @Column()
  voltage_id: number;

  @Column()
  ckt: string;

  @Column()
  amperage: string;

  @Column()
  connection_id: number;
}
