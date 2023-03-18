import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisconnectorDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  location_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  from_to: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  goes_to: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bus: string;

  @ApiProperty()
  @IsOptional()
  model: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  main: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  number_of_breakers: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  emergency_panel: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  voltage_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  thread_id: number;

  @ApiProperty()
  @IsOptional()
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
