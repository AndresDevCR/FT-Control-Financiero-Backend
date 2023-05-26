import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateInvoiceDto {
    
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    client_name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

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
    order_number: number;

    @ApiProperty()
    @IsOptional()
    created_at: Date;

    @ApiProperty()
    @IsOptional()
    updated_at: Date;
}
