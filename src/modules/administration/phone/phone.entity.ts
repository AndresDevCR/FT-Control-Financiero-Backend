import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';

@Entity({ schema, name: 'phone' })
export class UserPhone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column('enum', {
    enum: ['personal', 'work', 'home', 'office', 'other'],
    default: 'personal',
  })
  type: string;

  @Column()
  is_primary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
