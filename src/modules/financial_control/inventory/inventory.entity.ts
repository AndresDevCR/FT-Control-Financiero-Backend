import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema, name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string;

  @Column({ name: 'available_quantity', type: 'int' })
  availableQuantity: number;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt: Date;
}
