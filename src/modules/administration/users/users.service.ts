import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(
    user,
    pageNumber: number,
    pageSize: number,
    searchByName: string,
    searchByCompany: string,
    searchByRole: string,
  ) {
    let users = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id as id',
        'user.first_name as first_name',
        'user.last_name as last_name',
        'user.email as email',
        'user.is_active as is_active',
        'user.company_start_date as company_start_date',
        'role.name as role_name',
        'company.name as company_name',
      ])
      .where('user.id != :id', { id: user.id })
      .leftJoin('user.role', 'role')
      .leftJoin('user.company', 'company');

    console.log(searchByName);
    console.log(searchByCompany);
    if (searchByName) {
      users = users
        .where('user.first_name ilike :search', { search: `%${searchByName}%` })
        .orWhere('user.last_name ilike :search', {
          search: `%${searchByName}%`,
        })
        .orWhere('user.email ilike :search', { search: `%${searchByName}%` });
    }

    if (searchByCompany) {
      users = users.andWhere('company.name ilike :search', {
        search: `%${searchByCompany}%`,
      });
    }

    return users.orderBy('user.id', 'ASC').getRawMany();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
        //role: true,
      },
    });
  }

  update(id: number, updateUserDto: CreateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
