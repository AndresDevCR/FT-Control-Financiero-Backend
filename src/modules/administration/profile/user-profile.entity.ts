import { IsOptional, MaxLength } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../../../const';
import { User } from '../users/user.entity';

@Entity({ schema, name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @MaxLength(300)
  @IsOptional()
  image_url: string;

  @Column('date')
  birthdate: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
