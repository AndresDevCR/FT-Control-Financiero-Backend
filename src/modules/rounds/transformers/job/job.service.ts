import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './create-job.dto';
import { Job } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}
  create(createJobDto: CreateJobDto) {
    return this.jobRepository.save(createJobDto);
  }

  findAll() {
    return this.jobRepository.find();
  }

  findOne(id: number) {
    return this.jobRepository.findOne({ where: { id } });
  }

  update(id: number, updateJobDto: CreateJobDto) {
    return this.jobRepository.update(id, updateJobDto);
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
}
