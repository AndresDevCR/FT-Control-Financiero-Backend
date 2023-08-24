import { InventoryModule } from './pdfs/inventory/inventory.module';
import { InvoiceModule } from './pdfs/invoice/invoice.module';
import { PaymentModule } from './pdfs/payment/payment.module';
import { QuotationModule } from './pdfs/quotation/quotation.module';
import { VacationModule } from './pdfs/vacation/vacation.module';

export const controlCenterModules = [
  InvoiceModule,
  PaymentModule,
  VacationModule,
  InventoryModule,
  QuotationModule,
];
