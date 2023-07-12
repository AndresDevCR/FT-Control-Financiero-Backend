import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Employee } from '../employee/entities/employee.entity';

@Entity({ schema: schema, name: 'vacation' })
export class Vacation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column()
  start_date: Date;

  @Column()
  reentry_date: Date;

  @Column()
  request_status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Employee, (employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
