import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment', schema })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column()
  biweekly_salary: number;

  @Column()
  daily_salary: number;

  @Column()
  subsidy: number;

  @Column()
  hour_rate: number;

  @Column()
  extra_time_value: number;

  @Column()
  extra_time: number;

  @Column()
  extra_time_total: number;

  @Column()
  medical_leave_days: number;

  @Column()
  not_payed_leave_days: number;

  @Column()
  gross_payment: number;

  @Column()
  gross_payment_social_deduction: number;

  @Column()
  payment_advance: number;

  @Column()
  deduction_total: number;

  @Column()
  net_payment: number;

  @Column()
  net_payment_dollar: number;

  @Column()
  ins_payroll: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
