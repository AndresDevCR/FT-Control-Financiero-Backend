import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { Vacation } from '@/modules/financial_control/vacation/vacation.entity';
import { Employee } from '@/modules/financial_control/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation, Employee])],
  providers: [VacationService],
  controllers: [VacationController],
})
export class VacationModule {}
