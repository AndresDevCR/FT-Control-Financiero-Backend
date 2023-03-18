import { Injectable } from '@nestjs/common';
import { CreateOtherFacilityDto } from './create-other_facility.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtherFacility } from './other_facility.entity';

@Injectable()
export class OtherFacilityService {
  constructor(
    @InjectRepository(OtherFacility)
    private otherFacilityRepository: Repository<OtherFacility>,
  ) {}

  create(createOtherFacilityDto: CreateOtherFacilityDto) {
    return this.otherFacilityRepository.save(createOtherFacilityDto);
  }

  findAll() {
    return this.otherFacilityRepository.find();
  }

  findOne(id: number) {
    return this.otherFacilityRepository.findOne({ where: { id } });
  }

  update(id: number, updateOtherFacilityDto: CreateOtherFacilityDto) {
    return this.otherFacilityRepository.update(id, updateOtherFacilityDto);
  }

  remove(id: number) {
    return this.otherFacilityRepository.delete(id);
  }
}
