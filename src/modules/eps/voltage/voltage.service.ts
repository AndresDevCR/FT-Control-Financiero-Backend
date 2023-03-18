import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoltageDto } from './create-voltage.dto';
import { Voltage } from './voltage.entity';

@Injectable()
export class VoltageService {
  constructor(
    @InjectRepository(Voltage)
    private voltageRepository: Repository<Voltage>,
  ) {}

  create(createVoltageDto: CreateVoltageDto) {
    return this.voltageRepository.save(createVoltageDto);
  }

  findAll() {
    return this.voltageRepository.find();
  }

  findOne(id: number) {
    return this.voltageRepository.findOne({ where: { id } });
  }

  update(id: number, updateVoltageDto: CreateVoltageDto) {
    return this.voltageRepository.update(id, updateVoltageDto);
  }

  remove(id: number) {
    return this.voltageRepository.delete(id);
  }
}
