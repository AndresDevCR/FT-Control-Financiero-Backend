import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHasRole } from './user_has_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHasRole])],
})
export class UserHasRoleModule {}
