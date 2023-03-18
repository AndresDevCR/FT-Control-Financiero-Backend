import { Injectable } from '@nestjs/common';
import { CreateMechanicFacilityDto } from './create-mechanic_facility.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MechanicFacility } from './mechanic_facility.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MechanicFacilityService {
  constructor(
    @InjectRepository(MechanicFacility)
    private mechanicFacilityRepository: Repository<MechanicFacility>,
  ) {}
  create(createMechanicFacilityDto: CreateMechanicFacilityDto) {
    return this.mechanicFacilityRepository.save(createMechanicFacilityDto);
  }

  findAll() {
    return this.mechanicFacilityRepository.find();
  }

  findOne(id: number) {
    return this.mechanicFacilityRepository.findOne({ where: { id } });
  }

  update(id: number, updateMechanicFacilityDto: CreateMechanicFacilityDto) {
    return this.mechanicFacilityRepository.update(
      id,
      updateMechanicFacilityDto,
    );
  }

  remove(id: number) {
    return this.mechanicFacilityRepository.delete(id);
  }
}
