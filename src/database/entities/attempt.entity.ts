import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';
import { DictationMode } from '../enums';
import { AttemptDetail } from './attempt-detail.entity';

@Entity('attempts')
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.attempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  lesson_id: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.attempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ type: 'enum', enum: DictationMode })
  difficulty_mode: DictationMode;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  accuracy_percent: number;

  @Column({ type: 'int', default: 0 })
  correct_sentences: number;

  @Column({ type: 'int', default: 0 })
  total_sentences: number;

  @Column({ type: 'int', default: 0 })
  duration_seconds: number;

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @OneToMany(() => AttemptDetail, (detail) => detail.attempt, { cascade: true })
  details: AttemptDetail[];
}
