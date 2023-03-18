import { Module } from '@nestjs/common';
import { DisconnectorsService } from './disconnectors.service';
import { DisconnectorsController } from './disconnectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disconnector } from './disconnector.entity';
@Module({
  controllers: [DisconnectorsController],
  providers: [DisconnectorsService],
  imports: [TypeOrmModule.forFeature([Disconnector])],
})
export class DisconnectorsModule {}
