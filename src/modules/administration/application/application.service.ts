import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './create-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}
  create(createApplicationDto: CreateApplicationDto) {
    return this.applicationRepository.save(createApplicationDto);
  }

  findAll() {
    return this.applicationRepository.find();
  }

  findOne(id: number) {
    return this.applicationRepository.findOne({ where: { id } });
  }

  update(id: number, updateApplicationDto: CreateApplicationDto) {
    return this.applicationRepository.update(id, updateApplicationDto);
  }

  remove(id: number) {
    return this.applicationRepository.delete(id);
  }
}
