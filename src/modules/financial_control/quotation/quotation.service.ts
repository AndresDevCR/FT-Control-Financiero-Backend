import { Injectable } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation } from './entities/quotation.entity';
import { Client } from '../client/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuotationService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createQuotationDto: CreateQuotationDto) {
    return this.quotationRepository.save(createQuotationDto);
  }

  findAll() {
    return this.quotationRepository.find({
      relations: ['clients'],
    });
  }

  findOne(id: number) {
    return this.quotationRepository.findOne({
      where: { id },
      relations: ['clients'],
    });
  }

  update(id: number, updateQuotationDto: UpdateQuotationDto) {
    return this.quotationRepository.update(id, updateQuotationDto);
  }

  remove(id: number) {
    return this.quotationRepository.delete(id);
  }
}
