import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './create-thread.dto';
import { Thread } from './thread.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private threadRepository: Repository<Thread>,
  ) {}

  create(createThreadDto: CreateThreadDto) {
    return this.threadRepository.save(createThreadDto);
  }

  findAll() {
    return this.threadRepository.find();
  }

  findOne(id: number) {
    return this.threadRepository.findOne({ where: { id } });
  }

  update(id: number, updateThreadDto: CreateThreadDto) {
    return this.threadRepository.update(id, updateThreadDto);
  }

  remove(id: number) {
    return this.threadRepository.delete(id);
  }
}
