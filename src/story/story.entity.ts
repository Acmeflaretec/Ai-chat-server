import { Users } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feedback } from './feedback.entity';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  story: string;

  @Column({ nullable: true })
  mcq: string;

  @ManyToOne(() => Users, user => user.stories)
  author: Users;  

  @ManyToMany(() => Users, user => user.likes)
  likedBy: Users[];  

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
