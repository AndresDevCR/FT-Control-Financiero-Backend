import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';

@Entity({ name: 'quotation', schema })
export class Quotation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @Column()
  total_payment: number;

  @Column()
  total_payment_dollar: number;

  @Column()
  e_invoice_code: string;

  @Column()
  issue_date: Date;

  @Column()
  po_number: number;

  @Column()
  po_date: Date;

  @Column()
  description: string;

  @Column()
  quote_title: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Client, (client) => client.quotation)
  clients: Client[];
}
