import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { Employee } from '../employee/entities/employee.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const {
      employee_id,
      extra_time,
      extra_time_value,
      medical_leave_days,
      income_tax,
      dollar,
      not_payed_leave_days,
      payment_advance,
    } = createPaymentDto;

    // Fetch employee's monthly salary
    const employee = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
    const monthlySalary = employee.monthly_salary;

    // Calculate other payment fields based on the provided data
    const biweekly_salary = monthlySalary / 2;
    const daily_salary = monthlySalary / 30;
    const hour_rate = daily_salary / 8;
    const extra_time_total = extra_time * hour_rate * 1.5;
    const total_salary =
      biweekly_salary + extra_time_total - not_payed_leave_days * daily_salary;
    const gross_payment_social_deduction = total_salary * 0.1067;
    const deduction_total =
      gross_payment_social_deduction + income_tax + payment_advance;
    const net_payment = total_salary - deduction_total;
    const net_payment_dollar = net_payment / dollar;

    const subsidy = daily_salary / 2;
    const extra_time_value_data = hour_rate * 1.5;
    const gross_payment = biweekly_salary + extra_time_total;
    const gross_payment_dollar = gross_payment / dollar;

    // Create a new Payment entity
    const newPayment = this.paymentRepository.create({
      ...createPaymentDto,
      employee_id,
      biweekly_salary,
      daily_salary,
      subsidy,
      hour_rate,
      extra_time,
      extra_time_value: extra_time_value_data,
      medical_leave_days,
      gross_payment,
      gross_payment_dollar,
      income_tax,
      dollar,
      extra_time_total,
      total_salary,
      gross_payment_social_deduction,
      deduction_total,
      net_payment,
      net_payment_dollar,
    });

    // Save the new Payment entity to the database
    return this.paymentRepository.save(newPayment);
  }

  async findAllPayments() {
    return this.paymentRepository.find({
      relations: ['employee', 'employee.department', 'employee.position'],
    });
  }

  async findOnePayment(id: number) {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['employee', 'employee.department', 'employee.position'],
    });
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.paymentRepository.findOne({ where: { id } });
  }

  async deletePayment(id: number) {
    const deletedPayment = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!deletedPayment) {
      throw new NotFoundException('Payment not found.');
    }
    await this.paymentRepository.delete(id);
    return deletedPayment;
  }
}
