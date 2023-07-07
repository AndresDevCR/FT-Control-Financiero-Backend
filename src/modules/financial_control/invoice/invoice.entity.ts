import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Quotation } from '../quotation/entities/quotation.entity';
import { Supplier } from '../supplier/entities/supplier.entity';

@Entity({ schema: schema, name: 'invoice' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quotation_id: number;

  @Column()
  supplier_id: number;

  @Column()
  issue_date: Date;

  @Column()
  expiration_date: Date;

  @Column()
  invoice_number: number;

  @Column()
  dollar_value: number;

  @Column()
  total_colon: number;

  @Column()
  total_dollar: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Quotation, (quotation) => quotation.invoice)
  @JoinColumn({ name: 'quotation_id' })
  quotation: Quotation;

  @OneToOne(() => Supplier, (supplier) => supplier.id)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
