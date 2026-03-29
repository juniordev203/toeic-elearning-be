import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity('sentences')
@Index(['lesson_id', 'order_index'], { unique: true })
export class Sentence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  lesson_id: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.sentences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ type: 'int' })
  order_index: number;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  start_time: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  end_time: number;

  @Column({ type: 'jsonb', nullable: true })
  keywords: any;

  @Column({ type: 'jsonb', nullable: true })
  phrases: any;
}
