import { Module } from '@nestjs/common';
import { TransformerService } from './transformer.service';
import { TransformerController } from './transformer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transformer } from './transformer.entity';

@Module({
  controllers: [TransformerController],
  providers: [TransformerService],
  imports: [TypeOrmModule.forFeature([Transformer])],
})
export class TransformerModule {}
