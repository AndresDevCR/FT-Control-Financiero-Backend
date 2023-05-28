import { Module } from '@nestjs/common';
import { HumanRescourseService } from './human-rescourse.service';
import { HumanRescourseController } from './human-resource.controller';
import { HumanRescourse } from './human-rescourse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HumanRescourse])],
  controllers: [HumanRescourseController],
  providers: [HumanRescourseService],
})
export class HumanRescourseModule {}
