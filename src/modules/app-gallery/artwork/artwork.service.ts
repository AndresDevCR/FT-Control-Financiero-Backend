import { Injectable } from '@nestjs/common';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Artwork } from './entities/artwork.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createArtworkDto: CreateArtworkDto) {
    return this.artworkRepository.save(createArtworkDto);
  }

  findAll() {
    return this.artworkRepository.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.artworkRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  update(id: number, updateArtworkDto: UpdateArtworkDto) {
    return this.artworkRepository.update(id, updateArtworkDto);
  }

  remove(id: number) {
    return this.artworkRepository.delete(id);
  }
}
