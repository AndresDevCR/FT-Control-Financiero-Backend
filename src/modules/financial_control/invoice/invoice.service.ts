import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './create-invoice.dto';
import { Invoice } from './invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from '../quotation/entities/quotation.entity';
import { Supplier } from '../supplier/entities/supplier.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(Quotation)
    private readonly quotationRepository: Repository<Quotation>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.save(createInvoiceDto);
  }

  findAll() {
    return this.invoiceRepository.find({
      relations: [
        'quotation',
        'quotation.client',
        'quotation.client.enterprise',
        'supplier',
      ],
    });
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: [
        'quotation',
        'quotation.client',
        'quotation.client.enterprise',
        'supplier',
      ],
    });
  }

  update(id: number, updateInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.update(id, updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepository.delete(id);
  }
}
