import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateQuotationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_payment: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_payment_dollar: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  e_invoice_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  issue_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  po_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  po_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quote_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  created_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  updated_at: Date;
}
