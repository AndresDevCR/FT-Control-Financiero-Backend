import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHumanRescourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employee_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  entry_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rest_days: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vacation_days: string;

  @IsOptional()
  @IsString()
  createdAt: Date;

  @IsOptional()
  @IsString()
  updatedAt: Date;
}
