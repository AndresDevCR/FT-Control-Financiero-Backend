import { Module } from '@nestjs/common';
import { OtherFacilityService } from './other_facility.service';
import { OtherFacilityController } from './other_facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherFacility } from './other_facility.entity';

@Module({
  controllers: [OtherFacilityController],
  providers: [OtherFacilityService],
  imports: [TypeOrmModule.forFeature([OtherFacility])],
})
export class OtherFacilityModule {}
