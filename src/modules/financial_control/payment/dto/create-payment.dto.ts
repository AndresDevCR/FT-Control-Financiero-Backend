import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  employee_id: number;

  @ApiProperty()
  @IsNumber()
  biweekly_salary: number;

  @ApiProperty()
  @IsNumber()
  daily_salary: number;

  @ApiProperty()
  @IsNumber()
  subsidy: number;

  @ApiProperty()
  @IsNumber()
  hour_rate: number;

  @ApiProperty()
  @IsNumber()
  extra_time_value: number;

  @ApiProperty()
  @IsNumber()
  extra_time: number;

  @ApiProperty()
  @IsNumber()
  extra_time_total: number;

  @ApiProperty()
  @IsNumber()
  medical_leave_days: number;

  @ApiProperty()
  @IsNumber()
  not_payed_leave_days: number;

  @ApiProperty()
  @IsNumber()
  gross_payment: number;

  @ApiProperty()
  @IsNumber()
  gross_payment_social_deduction: number;

  @ApiProperty()
  @IsNumber()
  payment_advance: number;

  @ApiProperty()
  @IsNumber()
  deduction_total: number;

  @ApiProperty()
  @IsNumber()
  net_payment: number;

  @ApiProperty()
  @IsNumber()
  net_payment_dollar: number;

  @ApiProperty()
  @IsNumber()
  income_tax: number;

  @ApiProperty()
  @IsNumber()
  dollar: number;

  @ApiProperty()
  @IsNumber()
  total_salary: number;

  @ApiProperty()
  @IsNumber()
  ins_payroll: number;

  @IsOptional()
  @IsString()
  created_at: Date;

  @IsOptional()
  @IsString()
  updated_at: Date;
}
