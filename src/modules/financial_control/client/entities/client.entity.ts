import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enterprise } from '../../enterprise/entities/enterprise.entity';
import { Quotation } from '../../quotation/entities/quotation.entity';

@Entity({ name: 'client', schema })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  enterprise_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Enterprise, (enterprise) => enterprise.id)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @OneToOne(() => Quotation, (quotation) => quotation.client_id)
  @JoinColumn({ name: 'client_id' })
  quotation: Quotation;
}
