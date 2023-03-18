import { Injectable } from '@nestjs/common';
import { CreateImpactDto } from './create-impact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Impact } from './impact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImpactService {
  constructor(
    @InjectRepository(Impact)
    private impactRepository: Repository<Impact>,
  ) {}
  create(createImpactDto: CreateImpactDto) {
    return this.impactRepository.save(createImpactDto);
  }

  findAll() {
    return this.impactRepository.find();
  }

  findOne(id: number) {
    return this.impactRepository.findOne({ where: { id } });
  }

  update(id: number, updateImpactDto: CreateImpactDto) {
    return this.impactRepository.update(id, updateImpactDto);
  }

  remove(id: number) {
    return this.impactRepository.delete(id);
  }
}
