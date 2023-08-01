import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation } from '../quotation/entities/quotation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Enterprise, Quotation])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
