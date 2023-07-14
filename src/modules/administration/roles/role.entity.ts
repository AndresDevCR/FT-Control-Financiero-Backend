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

@Entity({ schema, name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('date')
  @CreateDateColumn()
  created_at: Date;

  @Column('date')
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.role)
  user: User;

  // @ManyToMany(() => User, (user) => user.roles, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // users?: User[];
}
