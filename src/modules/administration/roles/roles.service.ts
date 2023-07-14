import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.save(createRoleDto);
  }
  findAll() {
    return this.rolesRepository.find();
  }
  findOne(id: number) {
    return this.rolesRepository.findOne({ where: { id } });
  }
  update(id: number, updateRoleDto: CreateRoleDto) {
    return this.rolesRepository.update(id, updateRoleDto);
  }
  remove(id: number) {
    return this.rolesRepository.delete(id);
  }
}
