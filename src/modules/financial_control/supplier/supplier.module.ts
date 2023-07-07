import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { Supplier } from './entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../invoice/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Invoice])],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
