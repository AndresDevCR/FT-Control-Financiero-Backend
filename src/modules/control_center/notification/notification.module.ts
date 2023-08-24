import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NovuProvider } from './novu.provider';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from '@/modules/financial_control/vacation/vacation.entity';
import { Employee } from '@/modules/financial_control/employee/entities/employee.entity';
import { Payment } from '@/modules/financial_control/payment/entities/payment.entity';
import { Invoice } from '@/modules/financial_control/invoice/invoice.entity';
import { Supplier } from '@/modules/financial_control/supplier/entities/supplier.entity';
import { Client } from '@/modules/financial_control/client/entities/client.entity';
import { Quotation } from '@/modules/financial_control/quotation/entities/quotation.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Vacation,
      Payment,
      Invoice,
      Supplier,
      Client,
      Quotation,
    ]),
    ConfigModule,
  ],
  providers: [NovuProvider, NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
