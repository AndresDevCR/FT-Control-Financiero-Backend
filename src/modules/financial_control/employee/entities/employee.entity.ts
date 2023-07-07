import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Position } from '../../position/entities/position.entity';

@Entity({ name: 'employee', schema })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_name: string;

  @Column()
  enrollment_date: Date;

  @Column()
  position_id: number;

  @Column()
  department_id: number;

  @Column()
  monthly_salary: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  available_vacation_quantity: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Position, (position) => position.id)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @OneToOne(() => Department, (department) => department.employee)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
