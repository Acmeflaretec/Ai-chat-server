import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './story.entity';
import { Users } from 'src/user/user.entity';

@Injectable()
export class StoryService {
    constructor(
        @InjectRepository(Story)
        private storyRepository: Repository<Story>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
      ) { }


      async getStory(): Promise<Story[]> {
        const found = await this.storyRepository.find({ relations: ['author'] });
        if (!found) {
          throw new NotFoundException('Item not found');
        }
        return found;
      }
      async getOneById(id:string): Promise<Story> {
        const found = this.storyRepository.findOne({ where: { id } });
        if (!found) {
          throw new NotFoundException('Item not found');
        }
        return found;
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
