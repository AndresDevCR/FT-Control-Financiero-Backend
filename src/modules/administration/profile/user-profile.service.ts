import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './user-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(Profile)
    private userProfileRepository: Repository<Profile>,
  ) {}
  create(createUserProfileDto: CreateProfileDto) {
    return this.userProfileRepository.save(createUserProfileDto);
  }

  findAll() {
    return this.userProfileRepository.find();
  }

  findOne(id: number) {
    return this.userProfileRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserProfileDto: CreateProfileDto) {
    return this.userProfileRepository.update(id, updateUserProfileDto);
  }

  remove(id: number) {
    return this.userProfileRepository.delete(id);
  }
}
