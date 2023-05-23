import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './create-inventory.dto';
import { Inventory } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    return this.inventoryRepository.save(createInventoryDto);
  }

  findAll() {
    return this.inventoryRepository.find();
  }

  findOne(id: number) {
    return this.inventoryRepository.findOne({ where: { id } });
  }

  update(id: number, updateInventoryDto: CreateInventoryDto) {
    return this.inventoryRepository.update(id, updateInventoryDto);
  }

  remove(id: number) {
    return this.inventoryRepository.delete(id);
  }
}
