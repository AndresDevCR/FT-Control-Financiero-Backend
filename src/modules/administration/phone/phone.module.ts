import { Module } from '@nestjs/common';
import { UserPhoneService } from './phone.service';
import { UserPhoneController } from './phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPhone } from './phone.entity';

@Module({
  controllers: [UserPhoneController],
  providers: [UserPhoneService],
  imports: [TypeOrmModule.forFeature([UserPhone])],
})
export class PhoneModule {}
