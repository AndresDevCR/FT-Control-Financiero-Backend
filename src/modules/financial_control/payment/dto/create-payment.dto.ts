import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  employee_id: number;

  @IsNumber()
  @IsOptional()
  biweekly_salary: number;

  @IsNumber()
  @IsOptional()
  daily_salary: number;

  @IsNumber()
  @IsOptional()
  subsidy: number;

  @IsNumber()
  @IsOptional()
  hour_rate: number;

  @IsOptional()
  @IsNumber()
  extra_time_value: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  extra_time: number;

  @IsOptional()
  @IsNumber()
  extra_time_total: number;

  @IsOptional()
  @IsNumber()
  medical_leave_days: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  not_payed_leave_days: number;

  @IsOptional()
  @IsNumber()
  gross_payment: number;

  @IsOptional()
  @IsNumber()
  gross_payment_dollar: number;

  @IsOptional()
  @IsNumber()
  gross_payment_social_deduction: number;

  @IsOptional()
  @IsNumber()
  payment_advance: number;

  @IsOptional()
  @IsNumber()
  deduction_total: number;

  @IsOptional()
  @IsNumber()
  net_payment: number;

  @IsOptional()
  @IsNumber()
  net_payment_dollar: number;

  @IsOptional()
  @IsNumber()
  income_tax: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  dollar: number;

  @IsOptional()
  @IsNumber()
  total_salary: number;

  @IsOptional()
  @IsNumber()
  ins_payroll: number;

  @IsOptional()
  @IsString()
  created_at: Date;

  @IsOptional()
  @IsString()
  updated_at: Date;
}
