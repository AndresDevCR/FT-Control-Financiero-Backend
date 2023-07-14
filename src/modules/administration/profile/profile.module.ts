import { Module } from '@nestjs/common';
import { UserProfileService } from './profile.service';
import { UserProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class UserProfileModule {}
