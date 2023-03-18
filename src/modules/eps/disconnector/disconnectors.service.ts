import { Injectable } from '@nestjs/common';
import { CreateDisconnectorDto } from './create-disconnector.dto';
import { Disconnector } from './disconnector.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DisconnectorsService {
  constructor(
    @InjectRepository(Disconnector)
    private disconnectorsRepository: Repository<Disconnector>,
  ) {}
  create(createDisconnectorDto: CreateDisconnectorDto) {
    return this.disconnectorsRepository.save(createDisconnectorDto);
  }

  findAll() {
    return this.disconnectorsRepository.find();
  }

  findOne(id: number) {
    return this.disconnectorsRepository.findOne({ where: { id } });
  }

  update(id: number, updateDisconnectorDto: CreateDisconnectorDto) {
    return this.disconnectorsRepository.update(id, updateDisconnectorDto);
  }

  remove(id: number) {
    return this.disconnectorsRepository.delete(id);
  }
}
