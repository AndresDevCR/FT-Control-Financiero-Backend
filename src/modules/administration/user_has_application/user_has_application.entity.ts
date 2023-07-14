import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema, name: 'user_has_applications' })
export class UserHasApplication {
  @PrimaryColumn('int')
  user_id: number;

  @PrimaryColumn('int')
  application_id: number;
}
