import { Injectable } from '@nestjs/common';
import { CreateTransformerDto } from './create-transformer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transformer } from './transformer.entity';

@Injectable()
export class TransformerService {
  constructor(
    @InjectRepository(Transformer)
    private transformersRepository: Repository<Transformer>,
  ) {}
  create(createTransformerDto: CreateTransformerDto) {
    return this.transformersRepository.save(createTransformerDto);
  }

  findAll() {
    return this.transformersRepository.find();
  }

  findOne(id: number) {
    return this.transformersRepository.findOne({ where: { id } });
  }

  update(id: number, updateTransformerDto: CreateTransformerDto) {
    return this.transformersRepository.update(id, updateTransformerDto);
  }

  remove(id: number) {
    return this.transformersRepository.delete(id);
  }
}
