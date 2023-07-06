import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { Quotation } from './entities/quotation.entity';
import { Client } from '../client/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, Client])],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
