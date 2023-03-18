import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  display_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
