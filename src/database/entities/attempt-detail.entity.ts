import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Attempt } from './attempt.entity';
import { Sentence } from './sentence.entity';

@Entity('attempt_details')
export class AttemptDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  attempt_id: string;

  @ManyToOne(() => Attempt, (attempt) => attempt.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attempt_id' })
  attempt: Attempt;

  @Column('uuid')
  sentence_id: string;

  @ManyToOne(() => Sentence, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sentence_id' })
  sentence: Sentence;

  @Column({ type: 'text' })
  user_input: string;

  @Column({ default: false })
  is_correct: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0 })
  similarity_score: number;
}
