import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Story } from './story.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  storyId: string;

  @Column({ nullable: true })
  score: string;

  @Column({ nullable: true })
  feedback: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
