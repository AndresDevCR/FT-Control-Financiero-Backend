import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NovuProvider } from './novu.provider';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@/modules/financial_control/employee/entities/employee.entity';
import { Vacation } from '@/modules/financial_control/vacation/vacation.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Employee, Vacation]), ConfigModule],
  providers: [NovuProvider, NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
