import { IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  company_start_date: string;

  @ApiProperty()
  @IsOptional()
  is_active: boolean;

  @ApiProperty()
  @IsOptional()
  applications: any;

  @ApiProperty()
  @IsOptional()
  passwordReset: string;
}
