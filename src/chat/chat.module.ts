import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Story])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
