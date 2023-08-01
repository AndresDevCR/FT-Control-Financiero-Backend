import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async createLog(createLogDto: CreateLogDto, userId: number): Promise<Log> {
    const log = new Log();
    log.action = createLogDto.action;
    log.message = createLogDto.message;
    log.userId = userId;
    return this.logRepository.save(log);
  }

  async findAll(): Promise<Log[]> {
    return this.logRepository.find();
  }
}
