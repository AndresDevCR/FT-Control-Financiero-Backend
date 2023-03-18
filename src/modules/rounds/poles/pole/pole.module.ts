import { Module } from '@nestjs/common';
import { PoleService } from './pole.service';
import { PoleController } from './pole.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pole } from './pole.entity';

@Module({
  controllers: [PoleController],
  providers: [PoleService],
  imports: [TypeOrmModule.forFeature([Pole])],
})
export class PoleModule {}
