import { APP_GALLERY_SCHEMA as schema } from '@/const';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Artwork } from '../../artwork/entities/artwork.entity';

@Entity({ name: 'category', schema })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Artwork, (artwork) => artwork.id)
  artwork: Artwork;
}
