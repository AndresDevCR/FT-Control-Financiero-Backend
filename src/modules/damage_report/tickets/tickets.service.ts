import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.save(createTicketDto);
  }

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: number) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  update(id: number, updateTicketDto: CreateTicketDto) {
    return this.ticketRepository.update(id, updateTicketDto);
  }

  remove(id: number) {
    return this.ticketRepository.delete(id);
  }
}
