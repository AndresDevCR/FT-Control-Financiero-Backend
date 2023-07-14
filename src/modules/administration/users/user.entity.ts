import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';

import { Company } from '../company/company.entity';
import { Profile } from '../profile/profile.entity';
import { Application } from '../application/application.entity';
import { Role } from '../roles/role.entity';

@Entity({ schema, name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  company_id: number;

  @Column('date')
  company_start_date: Date;

  @Column('text')
  password: string;

  @Column('text', { nullable: true, select: false })
  password_reset_code: string;

  @Column('boolean')
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public last_login: Date | null;

  @Column('date', { select: false })
  @CreateDateColumn()
  created_at: Date;

  @Column('date', { select: false })
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => Company, (company) => company.user)
  @JoinColumn({ name: 'company_id' })
  company: Company[];

  @ManyToMany(() => Application, (application) => application.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'user_has_applications',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'application_id',
      referencedColumnName: 'id',
    },
  })
  applications?: Application[];

  @ManyToMany(() => Role, (role) => role.users, {
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
  role?: Role[];
}
