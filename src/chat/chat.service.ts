import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenAI } from 'openai'
import { Story } from './story.entity';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
  ) { }

  private openai = new OpenAI({
    apiKey: process.env.API_KEY
  });

  async getStory(): Promise<Story[]> {
    const found = await this.storyRepository.find();
    if (!found) {
      throw new NotFoundException('Item not found');
    }
    return found;
  }

  async getResponse(data: CreateStoryDto): Promise<Story> {
    return new Promise((resolve) => {
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `Write a story about "${data.prompt}" and response should have a name of story seperated by a "," and content of story.` },
        ],
      })
        .then((completion) => {
          if (completion?.choices[0]?.message !== null) {
            const story: Story = this.storyRepository.create();
            Object.assign(story, { story: completion.choices[0].message.content, author: data.author });
            const createdStory = this.storyRepository.save(story);
            resolve(createdStory)
          } else {
            throw new InternalServerErrorException('Failed to Generate response!')
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          throw new InternalServerErrorException(error)
        });
    });
  }

  async testResponse(data: CreateStoryDto): Promise<Story> {
    const found = this.storyRepository.findOne({ where: { id: '2' } });
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(found);
      }, 4000);
    });
  }
}



