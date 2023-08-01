import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { LogsService } from '@/modules/logbooks/log/logs.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,

    @InjectRepository(Position)
    private positionRepository: Repository<Position>,

    private readonly logsService: LogsService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, userId: number) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    const res = await this.employeeRepository.save(employee);
    const log = await this.logsService.createLog(
      {
        action: 'create',
        message: `Employee ${employee.employee_name} has been created`,
        userId: userId,
      },
      userId,
    );
    return { employee: res, log };
  }

  async findAll() {
    return this.employeeRepository.find({
      relations: ['department', 'position'],
    });
  }

  async findOne(id: number) {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['department', 'position'],
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
