import { Module } from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { VoltageController } from './voltage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voltage } from './voltage.entity';

@Module({
  controllers: [VoltageController],
  providers: [VoltageService],
  imports: [TypeOrmModule.forFeature([Voltage])],
})
export class VoltageModule {}
