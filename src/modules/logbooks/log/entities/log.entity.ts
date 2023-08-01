import { LOGS_SCHEMA as schema } from '@/const';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema, name: 'logs' })
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'action' })
  action: string;

  @Column({ name: 'message' })
  message: string;

  @Column({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;
}
