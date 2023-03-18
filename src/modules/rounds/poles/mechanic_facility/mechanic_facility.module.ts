import { Module } from '@nestjs/common';
import { MechanicFacilityService } from './mechanic_facility.service';
import { MechanicFacilityController } from './mechanic_facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MechanicFacility } from './mechanic_facility.entity';

@Module({
  controllers: [MechanicFacilityController],
  providers: [MechanicFacilityService],
  imports: [TypeOrmModule.forFeature([MechanicFacility])],
})
export class MechanicFacilityModule {}
