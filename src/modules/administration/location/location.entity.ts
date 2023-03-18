import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'location' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  building: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  active: boolean;
}
