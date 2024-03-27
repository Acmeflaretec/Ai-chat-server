import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './story.entity';
import { Users } from 'src/user/user.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './feedback.entity';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class StoryService {
   constructor(
      @InjectRepository(Story)
      private storyRepository: Repository<Story>,
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
      @InjectRepository(Feedback)
      private feedbackRepository: Repository<Feedback>,
      private chatService: ChatService
   ) { }


   async getStory(): Promise<Story[]> {
      const found = await this.storyRepository.find({ relations: ['author'] });
      if (!found) {
         throw new NotFoundException('Item not found');
      }
      return found;
   }
   async getFeedbacks(): Promise<Feedback[]> {
      const found = await this.feedbackRepository.find();
      if (!found) {
         throw new NotFoundException('Item not found');
      }
      return found;
   }
   async getOneById(id: string): Promise<Story> {
      const found = this.storyRepository.findOne({ where: { id } });
      if (!found) {
         throw new NotFoundException('Item not found');
      }
      return found;
   }

   async CheckFeedback(data: CreateFeedbackDto): Promise<Feedback> {
      const { userId, storyId } = data
      const found = await this.feedbackRepository.findOne({ where: { userId, storyId } });
      console.log(found);
      return found;
   }

   async CreateFeedback(data: CreateFeedbackDto): Promise<any> {
      const { userId, storyId, score, ans } = data
      console.log(data);

      const found = await this.feedbackRepository.findOne({ where: { userId, storyId } });
      console.log(found);
      
      if (found) {
         throw new NotFoundException('feedback already exist');
      }
      const story = await this.storyRepository.findOne({ where: { id: storyId } });
      const feedback = await this.chatService.getFeedback({ score, ans, story: story?.story, qns: story?.mcq })
      const newFeedback: Feedback = this.feedbackRepository.create({ userId, storyId, score, feedback });
      const createdFeedback = await this.feedbackRepository.save(newFeedback)
      return createdFeedback;
   }

   async deleteStory(storyId: string) {
      const storyToDelete = await this.storyRepository.findOne({ where: { id: storyId }, relations: ['author'] });

      if (!storyToDelete) {
         throw new Error('Story not found');
      }

      const userId = storyToDelete.author.id;

      if (userId && storyToDelete.author.stories) {
         storyToDelete.author.stories = storyToDelete.author.stories.filter(story => story.id !== storyToDelete.id);
      }
      await this.usersRepository.save(storyToDelete.author);
      await this.storyRepository.delete(storyId);
   }
}
