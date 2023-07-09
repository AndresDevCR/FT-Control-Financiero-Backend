import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updated_at: Date;
}
