import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTransformerDto {
  // @Column()
  // code: string;
  // @Column()
  // main: string;
  // @Column()
  // area: string;
  // @Column()
  // zone: string;
  // @Column()
  // from_to: string;
  // @Column()
  // voltage_id: number;
  // @Column()
  // model: string;
  // @Column()
  // disconnector_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  main: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from_to: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  voltage_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  disconnector_id: number;
}
