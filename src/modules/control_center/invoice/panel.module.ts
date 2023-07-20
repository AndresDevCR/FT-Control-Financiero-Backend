import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '@/modules/financial_control/invoice/invoice.entity';
import { InvoiceService } from './panel.service';
import { InvoiceController } from './panel.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
