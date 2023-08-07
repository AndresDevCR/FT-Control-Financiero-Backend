import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  employee_id: number;

  @ApiProperty()
  @IsNumber()
  extra_time: number;

  @ApiProperty()
  @IsNumber()
  medical_leave_days: number;

  @ApiProperty()
  @IsNumber()
  not_payed_leave_days: number;

  @ApiProperty()
  @IsNumber()
  payment_advance: number;

  @ApiProperty()
  @IsNumber()
  dollar: number;

  @IsOptional()
  @IsString()
  created_at: Date;

  @IsOptional()
  @IsString()
  updated_at: Date;
}
