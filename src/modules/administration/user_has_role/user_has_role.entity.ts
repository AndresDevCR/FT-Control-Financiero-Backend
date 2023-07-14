import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';

@Entity('user_has_role', { schema, name: 'user_has_role' })
export class UserHasRole {
  @PrimaryColumn('int')
  user_id: number;

  @PrimaryColumn('int')
  role_id: number;

  // @ManyToOne(() => User, (user) => user.roles, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  // users: User[];

  // @ManyToOne(() => Role, (role) => role.users, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  // roles: Role[];
}
