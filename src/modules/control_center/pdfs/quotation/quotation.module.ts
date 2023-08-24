import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { Quotation } from '@/modules/financial_control/quotation/entities/quotation.entity';
import { Client } from '@/modules/financial_control/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, Client])],
  providers: [QuotationService],
  controllers: [QuotationController],
})
export class QuotationModule {}
