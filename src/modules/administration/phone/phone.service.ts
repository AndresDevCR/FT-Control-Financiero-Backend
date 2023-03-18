import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './create-phone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPhone } from './phone.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserPhoneService {
  constructor(
    @InjectRepository(UserPhone)
    private userPhoneRepository: Repository<UserPhone>,
  ) {}

  create(createUserPhoneDto: CreatePhoneDto) {
    return this.userPhoneRepository.save(createUserPhoneDto);
  }

  findAll() {
    return this.userPhoneRepository.find();
  }

  findOne(id: number) {
    return this.userPhoneRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserPhoneDto: CreatePhoneDto) {
    return this.userPhoneRepository.update(id, updateUserPhoneDto);
  }

  remove(id: number) {
    return this.userPhoneRepository.delete(id);
  }
}
