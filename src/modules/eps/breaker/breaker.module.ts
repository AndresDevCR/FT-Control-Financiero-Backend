import { Module } from '@nestjs/common';
import { BreakerService } from './breaker.service';
import { BreakerController } from './breaker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breaker } from './breaker.entity';

@Module({
  controllers: [BreakerController],
  providers: [BreakerService],
  imports: [TypeOrmModule.forFeature([Breaker])],
})
export class BreakerModule {}
