import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate} from 'class-validator';

export class CreateVacationDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    employee_name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    available_quantity:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    start_date:Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reentry_date:Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    request_status:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    created_at:Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updated_at:Date;

}
