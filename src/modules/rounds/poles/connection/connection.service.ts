import { Injectable } from '@nestjs/common';
import { CreateConnectionDto } from './create-connection.dto';
import { Connection } from './connection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  create(createConnectionDto: CreateConnectionDto) {
    return this.connectionRepository.save(createConnectionDto);
  }

  findAll() {
    return this.connectionRepository.find();
  }

  findOne(id: number) {
    return this.connectionRepository.findOne({ where: { id } });
  }

  update(id: number, updateConnectionDto: CreateConnectionDto) {
    return this.connectionRepository.update(id, updateConnectionDto);
  }

  remove(id: number) {
    return this.connectionRepository.delete(id);
  }
}
