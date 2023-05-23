import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './create-invoice.dto';
import { Invoice } from './invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) { }
  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.save(createInvoiceDto);
  }

  findAll() {
    return this.invoiceRepository.find();
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({ where: { id } });
  }

  update(id: number, updateInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.update(id, updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepository.delete(id);
  }
}
