import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Artwork } from '../artwork/entities/artwork.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Artwork])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
