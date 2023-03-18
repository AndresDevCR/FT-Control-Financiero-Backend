import { Module } from '@nestjs/common';
import { ImpactService } from './impact.service';
import { ImpactController } from './impact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Impact } from './impact.entity';

@Module({
  controllers: [ImpactController],
  providers: [ImpactService],
  imports: [TypeOrmModule.forFeature([Impact])],
})
export class ImpactModule {}
