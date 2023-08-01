import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { Quotation } from './entities/quotation.entity';
import { Client } from '../client/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, Client, Invoice])],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
