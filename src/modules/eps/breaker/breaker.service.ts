import { Injectable } from '@nestjs/common';
import { CreateBreakerDto } from './create-breaker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breaker } from './breaker.entity';

@Injectable()
export class BreakerService {
  constructor(
    @InjectRepository(Breaker)
    private breakersRepository: Repository<Breaker>,
  ) {}

  async create(createBreakerDto: CreateBreakerDto) {
    return this.breakersRepository.save(createBreakerDto);
  }

  findAll() {
    return this.breakersRepository.find();
  }

  findOne(id: number) {
    return this.breakersRepository.findOne({ where: { id } });
  }

  update(id: number, updateBreakerDto: CreateBreakerDto) {
    return this.breakersRepository.update(id, updateBreakerDto);
  }

  remove(id: number) {
    return this.breakersRepository.delete(id);
  }
}
