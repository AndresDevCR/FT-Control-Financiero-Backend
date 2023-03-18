import { IsOptional, isString } from 'class-validator';

export class CreateVoltageDto {
  @IsOptional()
  @IsOptional()
  value: string;
}
