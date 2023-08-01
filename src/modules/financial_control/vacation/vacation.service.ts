import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './create-vacation.dto';
import { Vacation } from './vacation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(Vacation)
    private readonly vacationRepository: Repository<Vacation>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createVacationDto: CreateVacationDto) {
    return this.vacationRepository.save(createVacationDto);
  }

  findAll() {
    return this.vacationRepository.find({
      relations: ['employee', 'employee.department', 'employee.position'],
    });
  }

  findOne(id: number) {
    return this.vacationRepository.findOne({
      where: { id },
      relations: ['employee', 'employee.department', 'employee.position'],
    });
  }

  update(id: number, updateVacationDto: CreateVacationDto) {
    return this.vacationRepository.update(id, updateVacationDto);
  }

  remove(id: number) {
    return this.vacationRepository.delete(id);
  }
}
