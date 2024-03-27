import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from '../story/story.entity';
import { Users } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Users])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule { }
