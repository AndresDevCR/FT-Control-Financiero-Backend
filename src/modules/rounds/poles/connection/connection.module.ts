import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './connection.entity';

@Module({
  controllers: [ConnectionController],
  providers: [ConnectionService],
  imports: [TypeOrmModule.forFeature([Connection])],
})
export class ConnectionModule {}
