import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhaseDto {
  @ApiProperty()
  @IsOptional()
  value: string;
}
