import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'application' })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  name: string;

  @Column({ length: 70 })
  display_name: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;
}
