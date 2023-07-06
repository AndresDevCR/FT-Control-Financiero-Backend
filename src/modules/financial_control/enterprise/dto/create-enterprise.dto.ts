import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnterpriseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  enterprise_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updated_at: Date;
}
