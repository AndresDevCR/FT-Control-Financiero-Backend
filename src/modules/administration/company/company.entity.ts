import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';
import { User } from '../users/user.entity';

@Entity({ schema, name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  primary_phone_number: string;

  @Column({ nullable: true })
  secondary_phone_number: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ default: true })
  is_active: boolean;

  @Column('date')
  @CreateDateColumn()
  created_at: Date;

  @Column('date')
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.company)
  user: User;
}
