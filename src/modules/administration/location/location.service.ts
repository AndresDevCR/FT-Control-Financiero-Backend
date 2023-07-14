import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    return this.locationRepository.findOne({ where: { id } });
  }

  update(id: number, updateLocationDto: CreateLocationDto) {
    return this.locationRepository.update(id, updateLocationDto);
  }

  remove(id: number) {
    return this.locationRepository.delete(id);
  }
}
