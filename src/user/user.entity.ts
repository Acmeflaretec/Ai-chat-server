import { Story } from 'src/story/story.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;
  
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  dob: Date;

  @OneToMany(() => Story, story => story.author)
  stories: Story[];  

  @ManyToMany(() => Story, story => story.likedBy)
  likes: Story[];  
}
