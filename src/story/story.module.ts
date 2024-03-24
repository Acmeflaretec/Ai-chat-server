import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { Users } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Users])],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule { }
