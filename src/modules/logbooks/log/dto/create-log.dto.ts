import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateLogDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
