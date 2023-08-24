import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';
import { InjectNovu } from './novu.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacation } from '@/modules/financial_control/vacation/vacation.entity';
import { Employee } from '@/modules/financial_control/employee/entities/employee.entity';
import { Payment } from '@/modules/financial_control/payment/entities/payment.entity';
import { Invoice } from '@/modules/financial_control/invoice/invoice.entity';
import { Supplier } from '@/modules/financial_control/supplier/entities/supplier.entity';
import { Client } from '@/modules/financial_control/client/entities/client.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectNovu()
    private readonly novu: Novu,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Vacation)
    private readonly vacationRepository: Repository<Vacation>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
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

  async paymentEmail(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    const result = await this.novu.trigger('pagos', {
      to: {
        subscriberId: `${payment.employee.id}`,
        email: `${payment.employee.email}`,
      },
      payload: {
        name: `${payment.employee.employee_name}`,
        biweekly_salary: `${payment.biweekly_salary}`,
        extra_time_value: `${payment.extra_time_value}`,
        extra_time: `${payment.extra_time}`,
        extra_time_total: `${payment.extra_time_total}`,
        medical_leave_days: `${payment.medical_leave_days}`,
        not_payed_leave_days: `${payment.not_payed_leave_days}`,
        gross_payment: `${payment.gross_payment}`,
        gross_payment_dollar: `${payment.gross_payment_dollar}`,
        gross_payment_social_deduction: `${payment.gross_payment_social_deduction}`,
        deduction_total: `${payment.deduction_total}`,
        net_payment: `${payment.net_payment}`,
        net_payment_dollar: `${payment.net_payment_dollar}`,
        dollar: `${payment.dollar}`,
        total_salary: `${payment.total_salary}`,
      },
    });
    return result.data;
  }

  async invoiceEmail(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['supplier', 'quotation', 'quotation.client'],
    });

    const result = await this.novu.trigger('invoice', {
      to: {
        subscriberId: `${invoice.supplier.id}`,
        email: `${invoice.quotation.client.email}`,
      },
      payload: {
        invoice_number: `${invoice.invoice_number}`,
        nombre_del_destinatario: `${invoice.quotation.client.client_name}`,
        quotation_id: `${invoice.quotation.id}`,
        nombre_del_proveedor: `${invoice.supplier.supplier_name}`,
        issue_date: `${invoice.issue_date}`,
        expiration_date: `${invoice.expiration_date}`,
        dollar_value: `${invoice.dollar_value}`,
        total_colon: `${invoice.total_colon}`,
        total_dollar: `${invoice.total_dollar}`,
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
