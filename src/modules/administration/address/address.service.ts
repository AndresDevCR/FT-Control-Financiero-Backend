import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  create(createAddressDto: CreateAddressDto) {
    return this.addressRepository.save(createAddressDto);
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return this.addressRepository.findOne({ where: { id } });
  }

  update(id: number, updateAddressDto: CreateAddressDto) {
    return this.addressRepository.update(id, updateAddressDto);
  }

  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}
