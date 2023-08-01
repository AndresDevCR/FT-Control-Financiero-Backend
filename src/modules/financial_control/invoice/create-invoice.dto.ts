import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quotation_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  supplier_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  issue_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expiration_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  invoice_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  dollar_value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_colon: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_dollar: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updated_at: Date;
}
