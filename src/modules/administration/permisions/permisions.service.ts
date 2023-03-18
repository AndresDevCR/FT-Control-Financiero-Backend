import { Injectable } from '@nestjs/common';
import { CreatePermisionDto } from './create-permision.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permision } from './permision.entity';

@Injectable()
export class PermisionsService {
  constructor(
    @InjectRepository(Permision)
    private readonly permisionsRepository: Repository<Permision>,
  ) {}
  create(createPermisionDto: CreatePermisionDto) {
    return this.permisionsRepository.save(createPermisionDto);
  }

  findAll() {
    return this.permisionsRepository.find();
  }

  findOne(id: number) {
    return this.permisionsRepository.findOne({ where: { id } });
  }

  update(id: number, updatePermisionDto: CreatePermisionDto) {
    return this.permisionsRepository.update(id, updatePermisionDto);
  }

  remove(id: number) {
    return this.permisionsRepository.delete(id);
  }
}
