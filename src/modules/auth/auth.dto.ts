import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @Trim()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  passwordReset: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  company_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  role_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  application_id: number;

  @ApiProperty()
  @IsNotEmpty()
  company_start_date: Date;
}

export class LoginDto {
  @ApiProperty()
  @Trim()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
