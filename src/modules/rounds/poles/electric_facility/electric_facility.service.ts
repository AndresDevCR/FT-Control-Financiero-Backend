import { Injectable } from '@nestjs/common';
import { CreateElectricFacilityDto } from './create-electric_facility.dto';
import { ElectricFacility } from './electric_facility.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ElectricFacilityService {
  constructor(
    @InjectRepository(ElectricFacility)
    private readonly electricFacilityRepository: Repository<ElectricFacility>,
  ) {}
  create(createElectricFacilityDto: CreateElectricFacilityDto) {
    return this.electricFacilityRepository.save(createElectricFacilityDto);
  }

  findAll() {
    return this.electricFacilityRepository.find();
  }

  findOne(id: number) {
    return this.electricFacilityRepository.findOne({ where: { id } });
  }

  update(id: number, updateElectricFacilityDto: CreateElectricFacilityDto) {
    return this.electricFacilityRepository.update(
      id,
      updateElectricFacilityDto,
    );
  }

  remove(id: number) {
    return this.electricFacilityRepository.delete(id);
  }
}
