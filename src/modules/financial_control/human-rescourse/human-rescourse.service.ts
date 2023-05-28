import { Injectable } from '@nestjs/common';
import { CreateHumanRescourseDto } from './create-human-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HumanRescourse } from './human-rescourse.entity';

@Injectable()
export class HumanRescourseService {
  constructor(
    @InjectRepository(HumanRescourse)
    private readonly humanRescourseRepository: Repository<HumanRescourse>,
  ) {}
  create(createHumanRescourseDto: CreateHumanRescourseDto) {
    return this.humanRescourseRepository.save(createHumanRescourseDto);
  }

  findAll() {
    return this.humanRescourseRepository.find();
  }

  findOne(id: number) {
    return this.humanRescourseRepository.findOne({ where: { id } });
  }

  update(id: number, updateHumanRescourseDto: CreateHumanRescourseDto) {
    return this.humanRescourseRepository.update(id, updateHumanRescourseDto);
  }

  remove(id: number) {
    return this.humanRescourseRepository.delete(id);
  }
}
