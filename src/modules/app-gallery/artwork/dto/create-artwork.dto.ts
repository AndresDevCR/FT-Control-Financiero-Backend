import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateArtworkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_favorite: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  created_at: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updated_at: Date;
}
