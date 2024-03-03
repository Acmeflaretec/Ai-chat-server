import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateStoryDto } from './create-chat.dto';
import { Story } from './story.entity';

@Controller('chat')
export class ChatController {
   constructor(private readonly chatService: ChatService) { }

   @Get()
   async getStories(): Promise<Story[]> {
      return await this.chatService.getStory();
   }

   @Post()
   async getResponse(@Body() data: CreateStoryDto): Promise<Story> {
      console.log(data.prompt);
      return await this.chatService.getResponse(data);
   }

   @Post('/test')
   async testResponse(@Body() data: CreateStoryDto): Promise<Story> {
      console.log(data);
      return await this.chatService.testResponse(data);
   }
}
