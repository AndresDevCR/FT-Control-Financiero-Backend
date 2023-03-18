import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../../../const';
import { Panel } from '../panel/panel.entity';

@Entity({ schema, name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  user_id: number;

  @Column()
  panel_id: number;

  @Column({ type: 'timestamp' })
  created_at: number;

  @Column({ type: 'timestamp' })
  updated_at: number;

  @ManyToOne(() => Panel, (panel) => panel.comments)
  @JoinColumn({ name: 'panel_id' })
  panel: Panel[];
}
