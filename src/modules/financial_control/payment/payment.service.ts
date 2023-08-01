import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Employee } from '../employee/entities/employee.entity';
import { Payment } from './entities/payment.entity';

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
      biweekly_salary + extra_time_total - medical_leave_days;
    const gross_payment_social_deduction = total_salary * 0.1067;
    const deduction_total = gross_payment_social_deduction + income_tax;
    const net_payment = total_salary - deduction_total;
    const net_payment_dollar = net_payment / dollar;

    // Create a new Payment entity
    const newPayment = new Payment();
    newPayment.employee_id = employee_id;
    newPayment.biweekly_salary = biweekly_salary;
    newPayment.daily_salary = daily_salary;
    newPayment.hour_rate = hour_rate;
    newPayment.extra_time_total = extra_time_total;
    newPayment.total_salary = total_salary;
    newPayment.gross_payment_social_deduction = gross_payment_social_deduction;
    newPayment.deduction_total = deduction_total;
    newPayment.net_payment = net_payment;
    newPayment.net_payment_dollar = net_payment_dollar;
    newPayment.dollar = dollar;
    newPayment.extra_time_value = hour_rate * 1.5;

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
