import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';
import { InjectNovu } from './novu.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacation } from '@/modules/financial_control/vacation/vacation.entity';
import { Employee } from '@/modules/financial_control/employee/entities/employee.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectNovu()
    private readonly novu: Novu,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Vacation)
    private readonly vacationRepository: Repository<Vacation>,
  ) {}

  async vacationEmail(id: number) {
    const vacation = await this.vacationRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    const result = await this.novu.trigger('vacaciones', {
      to: {
        subscriberId: `${vacation.employee.id}`,
        email: `${vacation.employee.email}`,
      },
      payload: {
        name: `${vacation.employee.employee_name}`,
        fechaInicio: `${vacation.start_date}`,
        fechaIngreso: `${vacation.reentry_date}`,
      },
    });
    return result.data;
  }

  async createTopic(key: string, name: string) {
    const result = await this.novu.topics.create({
      key,
      name,
    });

    return result.data;
  }

  async addSubscriber(key: string, subscriberId: string) {
    const result = await this.novu.topics.addSubscribers(key, {
      subscribers: [subscriberId],
    });

    return result.data;
  }
}
