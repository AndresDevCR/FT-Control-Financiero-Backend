import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async findAll(company) {
    const company_id = company ?? this.request.user['company_id'];
    const user_id = this.request.user['id'];
    return this.userRepository.find({
      where: { id: Not(user_id), company_id: company_id },
      relations: ['profile', 'company', 'applications.role'],
    });
  }

  findOne(id: number, company) {
    const company_id = company ?? this.request.user['company_id'];
    return this.userRepository.findOne({
      where: { id: id, company_id: company_id },
      relations: ['profile', 'company', 'module', 'applications.role'],
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
