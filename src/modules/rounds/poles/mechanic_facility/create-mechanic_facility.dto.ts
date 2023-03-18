import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMechanicFacilityDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  number_of_valves: number;
}
