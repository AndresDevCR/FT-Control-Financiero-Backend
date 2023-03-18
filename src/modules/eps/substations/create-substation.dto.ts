import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSubstationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  location_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  from_to: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  goes_to: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  transformer_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bus: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  main: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number_of_breakers: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  emergency_panel: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  voltage_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  thread_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phase_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phase_description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  neutral: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ground: string;
}
