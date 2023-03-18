import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_POLES as schema } from '../../../../const';

@Entity({ schema, name: 'mechanic_facility' })
export class MechanicFacility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number_of_valves: number;
}
