import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panel } from './panel.entity';
import { Breaker } from '../breaker/breaker.entity';
import { Comment } from '../comment/comment.entity';

@Module({
  controllers: [PanelController],
  providers: [PanelService],
  imports: [TypeOrmModule.forFeature([Panel, Breaker, Comment])],
})
export class PanelModule {}
