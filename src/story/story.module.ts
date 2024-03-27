import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { Users } from 'src/user/user.entity';
import { Feedback } from './feedback.entity';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Users, Feedback])],
  controllers: [StoryController],
  providers: [StoryService,ChatService]
})
export class StoryModule { }
