import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  biweekly_salary: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  daily_salary: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subsidy: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hour_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  extra_time_value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  extra_time: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  extra_time_total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  medical_leave_days: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  not_payed_leave_days: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gross_payment: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  gross_payment_social_deduction: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  payment_advance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  deduction_total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  net_payment: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  net_payment_dollar: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ins_payroll: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updated_at: Date;
}
