import { Module } from '@nestjs/common';
import { ElectricFacilityService } from './electric_facility.service';
import { ElectricFacilityController } from './electric_facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectricFacility } from './electric_facility.entity';

@Module({
  controllers: [ElectricFacilityController],
  providers: [ElectricFacilityService],
  imports: [TypeOrmModule.forFeature([ElectricFacility])],
})
export class ElectricFacilityModule {}
