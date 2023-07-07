import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'department', schema })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
