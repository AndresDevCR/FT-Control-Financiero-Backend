import { APP_GALLERY_SCHEMA as schema } from '@/const';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity({ name: 'artwork', schema })
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  artist: string;

  @Column()
  category_id: number;

  @Column()
  is_available: boolean;

  @Column({ default: false })
  is_favorite: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Category, (category) => category.artwork)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
