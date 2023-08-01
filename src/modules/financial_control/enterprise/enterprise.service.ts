import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private enterpriseRepository: Repository<Enterprise>,
  ) {}

  create(createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseRepository.save(createEnterpriseDto);
  }

  findAll() {
    return this.enterpriseRepository.find();
  }

  findOne(id: number) {
    return this.enterpriseRepository.findOne({ where: { id } });
  }

  update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseRepository.update(id, updateEnterpriseDto);
  }

  remove(id: number) {
    return this.enterpriseRepository.delete(id);
  }
}
