import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRoleDto } from './create-role.dto';

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

  getRolesByApplication(application_id: number) {
    return this.rolesRepository.find({
      where: { application_id: application_id },
    });
  }
}
