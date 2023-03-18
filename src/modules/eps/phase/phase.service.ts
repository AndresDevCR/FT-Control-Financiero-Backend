import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhaseDto } from './create-phase.dto';
import { Phase } from './phase.entity';

@Injectable()
export class PhaseService {
  constructor(
    @InjectRepository(Phase)
    private phaseRepository: Repository<Phase>,
  ) {}

  create(createPhaseDto: CreatePhaseDto) {
    return this.phaseRepository.save(createPhaseDto);
  }

  findAll() {
    return this.phaseRepository.find();
  }

  findOne(id: number) {
    return this.phaseRepository.findOne({ where: { id } });
  }

  update(id: number, updatePhaseDto: CreatePhaseDto) {
    return this.phaseRepository.update(id, updatePhaseDto);
  }

  remove(id: number) {
    return this.phaseRepository.delete(id);
  }
}
