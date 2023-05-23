import { InventoryModule } from './inventory/inventory.module';
import { Invoice } from './invoice/invoice.entity';
import { Vacation } from './vacation/vacation.entity';

export const financialControlModules = [InventoryModule, Invoice, Vacation];
