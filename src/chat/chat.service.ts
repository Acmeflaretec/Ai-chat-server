import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenAI } from 'openai'
import { Story } from '../story/story.entity';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './create-chat.dto';
import { Users } from 'src/user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  private openai = new OpenAI({
    apiKey: process.env.API_KEY
  });

  async getResponse(data: CreateStoryDto): Promise<Story> {
    const user: Users = await this.usersRepository.findOne({
      where: { id: data?.author },
    });
    return new Promise((resolve) => {
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `Write a story about "${data.prompt}" and response should have a name of story seperated by a "," and content of story.` },
        ],
      })
        .then((completion) => {
          if (completion?.choices[0]?.message !== null) {
            const story: Story = this.storyRepository.create({ story: completion.choices[0].message.content, author: user });
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

  async getMcqs(id: string): Promise<Story> {
    const data = await this.storyRepository.findOne({ where: { id } });
    const prompt = `Give 10 Multiple choise questions that a five year old can answer regarding this story ${data?.story}. The response should contain only an array of objects in this format 
    [{question: "What is the name of the wise gray wolf in the story?",options: ["Leo", "Luna", "Lily"],answer: "Luna"}] also no escape characters should present in that array, i want to map the questions one by one so it should be a perfect array, also when setting options please dont repeat the index of correct answers`
    return new Promise((resolve) => {
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt },
        ],
      })
        .then((completion) => {
          if (completion?.choices[0]?.message !== null) {
            console.log(completion.choices[0].message.content);
            Object.assign(data, { mcq: completion.choices[0].message.content });
            const story = this.storyRepository.save(data);
            resolve(story)
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

  async getFeedback({ score, ans, story, qns }): Promise<string> {
    const prompt = `Give a constructive feedback about thinking, understanding etc to the parents of a five year old child who scored ${score} in the questionare regarding this story ${story}. 
    This was the questions asked ${qns} and this was his answers ${ans}.`
    return new Promise((resolve) => {
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt },
        ],
      })
        .then((completion) => {
          if (completion?.choices[0]?.message !== null) {
            console.log(completion.choices[0].message.content);
            resolve(completion.choices[0].message.content)
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
}



