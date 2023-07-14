import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthModule } from '../../auth/auth.module';
import { UserHasRoleModule } from '../user_has_role/user_has_role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, UserHasRoleModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
