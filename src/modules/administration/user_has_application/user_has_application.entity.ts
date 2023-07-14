import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';

import { User } from '../users/user.entity';
import { Application } from '../application/application.entity';

@Entity({ schema, name: 'user_has_applications' })
export class UserHasApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn('int')
  user_id: number;

  @PrimaryColumn('int')
  application_id: number;

  @ManyToOne(() => User, (user) => user.applications, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Application, (application) => application.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'application_id', referencedColumnName: 'id' }])
  applications: Application[];
}
