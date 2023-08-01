import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation } from '../quotation/entities/quotation.entity';
import { Supplier } from '../supplier/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Quotation, Supplier])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
