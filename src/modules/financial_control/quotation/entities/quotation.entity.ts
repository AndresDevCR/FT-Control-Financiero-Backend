import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Client } from '../../client/entities/client.entity';
import { Invoice } from '../../invoice/invoice.entity';

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

  @OneToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToOne(() => Invoice, (invoice) => invoice.quotation_id)
  @JoinColumn({ name: 'id' })
  invoice: Invoice;
}
