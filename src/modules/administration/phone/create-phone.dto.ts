import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
