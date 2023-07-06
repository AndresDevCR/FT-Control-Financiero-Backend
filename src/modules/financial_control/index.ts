import { EnterpriseModule } from './enterprise/enterprise.module';
import { HumanRescourseModule } from './human-rescourse/human-resource.module';
import { InventoryModule } from './inventory/inventory.module';
import { InvoiceModule } from './invoice/invoice.module';
import { VacationModule } from './vacation/vacation.module';

export const financialControlModules = [
  InventoryModule,
  InvoiceModule,
  VacationModule,
  EnterpriseModule,
  HumanRescourseModule,
];
