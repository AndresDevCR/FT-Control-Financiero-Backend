import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from '../../invoice/invoice.entity';

@Entity({ name: 'supplier', schema })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplier_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  //   @OneToOne(() => Invoice, (invoice) => invoice.quotation_id)
  //   @JoinColumn({ name: 'id' })
  //   invoice: Invoice;

  @OneToMany(() => Invoice, (invoice) => invoice.supplier)
  invoices: Invoice[];
}
