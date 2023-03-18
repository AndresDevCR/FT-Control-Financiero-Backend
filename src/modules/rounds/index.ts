import { ConnectionModule } from './poles/connection/connection.module';
import { OtherFacilityModule } from './poles/other_facility/other_facility.module';
import { PoleModule } from './poles/pole/pole.module';
import { ElectricFacilityModule } from './poles/electric_facility/electric_facility.module';
import { MechanicFacilityModule } from './poles/mechanic_facility/mechanic_facility.module';

export const PolesModules = [
  ConnectionModule,
  OtherFacilityModule,
  PoleModule,
  ElectricFacilityModule,
  MechanicFacilityModule,
];
