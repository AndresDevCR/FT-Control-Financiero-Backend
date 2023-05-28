import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './create-vacation.dto';
import { Vacation } from './vacation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(Vacation)
    private readonly vacationRepository: Repository<Vacation>,
  ) {}

  create(createVacationDto: CreateVacationDto) {
    return this.vacationRepository.save(createVacationDto);
  }

  findAll() {
    return this.vacationRepository.find();
  }

  findOne(id: number) {
    return this.vacationRepository.findOne({ where: { id } });
  }

  update(id: number, updateVacationDto: CreateVacationDto) {
    return this.vacationRepository.update(id, updateVacationDto);
  }

  remove(id: number) {
    return this.vacationRepository.delete(id);
  }
}
