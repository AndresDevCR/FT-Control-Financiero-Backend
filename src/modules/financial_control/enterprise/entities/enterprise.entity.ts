import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';

@Entity({ name: 'enterprise', schema })
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enterprise_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Client, (client) => client.enterprise)
  clients: Client[];
}
