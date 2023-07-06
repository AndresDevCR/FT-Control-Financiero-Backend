import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
