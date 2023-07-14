import { Module } from '@nestjs/common';
import { PermisionsService } from './permisions.service';
import { PermisionsController } from './permisions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permision } from './permision.entity';

@Module({
  controllers: [PermisionsController],
  providers: [PermisionsService],
  imports: [TypeOrmModule.forFeature([Permision])],
})
export class PermisionsModule {}
