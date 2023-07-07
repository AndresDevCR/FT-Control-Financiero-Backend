import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.save(createPaymentDto);
  }

  findAll() {
    return this.paymentRepository.find({
      relations: ['employee', 'employee.department', 'employee.position'],
    });
  }

  findOne(id: number) {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['employee', 'employee.department', 'employee.position'],
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
