import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './create-status.dto';
import { Status } from './status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}
  create(createStatusDto: CreateStatusDto) {
    return this.statusRepository.save(createStatusDto);
  }

  findAll() {
    return this.statusRepository.find();
  }

  findOne(id: number) {
    return this.statusRepository.findOne({ where: { id } });
  }

  update(id: number, updateStatusDto: CreateStatusDto) {
    return this.statusRepository.update(id, updateStatusDto);
  }

  remove(id: number) {
    return this.statusRepository.delete(id);
  }
}
