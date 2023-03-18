import { Injectable } from '@nestjs/common';
import { CreateSubstationDto } from './create-substation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Substation } from './substation.entity';

@Injectable()
export class SubstationsService {
  constructor(
    @InjectRepository(Substation)
    private substationsRepository: Repository<Substation>,
  ) {}

  create(createSubstationDto: CreateSubstationDto) {
    return this.substationsRepository.save(createSubstationDto);
  }

  findAll() {
    return this.substationsRepository.find();
  }

  findOne(id: number) {
    return this.substationsRepository.findOne({ where: { id } });
  }

  update(id: number, updateSubstationDto: CreateSubstationDto) {
    return this.substationsRepository.update(id, updateSubstationDto);
  }

  remove(id: number) {
    return this.substationsRepository.delete(id);
  }
}
