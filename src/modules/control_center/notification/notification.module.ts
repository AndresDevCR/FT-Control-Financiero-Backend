import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NovuProvider } from './novu.provider';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from '@/modules/financial_control/vacation/vacation.entity';
import { Employee } from '@/modules/financial_control/employee/entities/employee.entity';
import { Payment } from '@/modules/financial_control/payment/entities/payment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Vacation, Payment]),
    ConfigModule,
  ],
  providers: [NovuProvider, NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
