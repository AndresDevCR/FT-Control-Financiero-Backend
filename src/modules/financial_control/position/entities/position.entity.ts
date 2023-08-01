import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'position', schema })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
