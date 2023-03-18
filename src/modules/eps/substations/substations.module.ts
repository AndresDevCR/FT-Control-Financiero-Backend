import { Module } from '@nestjs/common';
import { SubstationsService } from './substations.service';
import { SubstationsController } from './substations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Substation } from './substation.entity';

@Module({
  controllers: [SubstationsController],
  providers: [SubstationsService],
  imports: [TypeOrmModule.forFeature([Substation])],
})
export class SubstationsModule {}
