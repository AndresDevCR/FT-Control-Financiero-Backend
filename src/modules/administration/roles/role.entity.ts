import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';
import { User } from '../users/user.entity';
import { Application } from '../application/application.entity';

@Entity({ schema, name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  display_name: string;

  @Column('integer')
  application_id: number;

  @Column('text')
  description: string;

  @Column('date')
  @CreateDateColumn()
  created_at: Date;

  @Column('date')
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.role, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  @OneToOne(() => Application, (application) => application.role)
  @JoinColumn({ name: 'application_id' })
  application: Application[];
}
