import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ELECTRICAL_POLES as schema } from '../../../../const';

@Entity({ schema, name: 'other_facility' })
export class OtherFacility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
