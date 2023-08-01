import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

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

  @OneToOne(() => Employee, (employee) => employee.department)
  @JoinColumn({ name: 'id' })
  employee: Employee;
}
