import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employee_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  enrollment_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  position_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  department_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  monthly_salary: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  available_vacation_quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updated_at: Date;
}
