import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema })
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enterprise_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
