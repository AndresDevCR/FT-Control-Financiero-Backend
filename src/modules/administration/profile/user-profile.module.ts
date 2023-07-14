import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './user-profile.entity';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class UserProfileModule {}
