import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateVacationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reentry_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  request_status: string;

  @IsOptional()
  @IsString()
  created_at: Date;

  @IsOptional()
  @IsString()
  updated_at: Date;
}
