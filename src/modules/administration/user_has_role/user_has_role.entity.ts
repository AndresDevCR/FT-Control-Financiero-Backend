import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';

@Entity('user_has_roles', { schema, name: 'user_has_roles' })
export class UserHasRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  role_id: number;
}
