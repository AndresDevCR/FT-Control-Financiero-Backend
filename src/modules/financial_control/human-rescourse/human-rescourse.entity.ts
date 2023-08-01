import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';

@Entity({ schema: schema, name: 'human_resource' })
export class HumanRescourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  entry_date: Date;

  @Column()
  salary: number;

  @Column()
  position: string;

  @Column()
  department: string;

  @Column()
  schedule: string;

  @Column()
  rest_days: string;

  @Column()
  vacation_days: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
