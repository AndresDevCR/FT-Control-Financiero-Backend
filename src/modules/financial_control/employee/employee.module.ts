import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { Payment } from '../payment/entities/payment.entity';
import { Vacation } from '../vacation/vacation.entity';
import { Log } from '@/modules/logbooks/log/entities/log.entity';
import { LogsService } from '@/modules/logbooks/log/logs.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      Position,
      Payment,
      Vacation,
      Log,
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, LogsService],
})
export class EmployeeModule {}
