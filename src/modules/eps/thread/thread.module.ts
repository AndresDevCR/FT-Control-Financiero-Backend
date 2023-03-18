import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';

@Module({
  controllers: [ThreadController],
  providers: [ThreadService],
  imports: [TypeOrmModule.forFeature([Thread])],
})
export class ThreadModule {}
