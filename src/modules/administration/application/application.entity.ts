import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

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

  @ManyToMany(() => User, (user) => user.applications, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  users?: User[];

  @OneToOne(() => Role, (role) => role.application)
  role: Role[];
}
