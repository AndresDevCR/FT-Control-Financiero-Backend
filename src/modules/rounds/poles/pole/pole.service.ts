import { Injectable } from '@nestjs/common';
import { CreatePoleDto } from './create-pole.dto';
import { Pole } from './pole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PoleService {
  constructor(
    @InjectRepository(Pole)
    private readonly poleRepository: Repository<Pole>,
  ) {}
  create(createPoleDto: CreatePoleDto) {
    return this.poleRepository.save(createPoleDto);
  }

  findAll() {
    return this.poleRepository.find();
  }

  findOne(id: number) {
    return this.poleRepository.findOne({ where: { id } });
  }

  update(id: number, updatePoleDto: CreatePoleDto) {
    return this.poleRepository.update(id, updatePoleDto);
  }

  remove(id: number) {
    return this.poleRepository.delete(id);
  }
}
