import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreakerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  location_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  caliber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  panel_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  phase_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  voltage_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  thread_id: number;
}
