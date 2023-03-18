import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateElectricFacilityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  board: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  voltage_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ckt: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  amperage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  connection_id: number;
}
