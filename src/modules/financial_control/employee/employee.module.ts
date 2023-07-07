import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, Position])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
