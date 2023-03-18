import { Injectable } from '@nestjs/common';
import { CreatePanelDto } from './create-panel.dto';
import { Panel } from './panel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breaker } from '../breaker/breaker.entity';
import { Comment } from '../comment/comment.entity';
@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(Panel)
    private panelRepository: Repository<Panel>,
    @InjectRepository(Breaker)
    private breakerRepository: Repository<Breaker>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  create(createPanelDto: CreatePanelDto) {
    return this.panelRepository.save(createPanelDto);
  }

  findAll() {
    return this.panelRepository.find();
  }

  findOne(id: number) {
    return this.panelRepository.findOne({
      where: { id },
      relations: ['breakers', 'comments'],
    });
  }

  update(id: number, updatePanelDto: CreatePanelDto) {
    return this.panelRepository.update(id, updatePanelDto);
  }

  remove(id: number) {
    return this.panelRepository.delete(id);
  }
}
