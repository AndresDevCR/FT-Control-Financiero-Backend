import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHasApplication } from './user_has_application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHasApplication])],
  exports: [TypeOrmModule.forFeature([UserHasApplication])],
})
export class UserHasApplicationModule {}
