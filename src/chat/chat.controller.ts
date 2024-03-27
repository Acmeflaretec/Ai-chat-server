import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateStoryDto } from './create-chat.dto';
import { Story } from '../story/story.entity';

@Controller('chat')
export class ChatController {
   constructor(private readonly chatService: ChatService) { }

   @Post()
   async getResponse(@Body() data: CreateStoryDto): Promise<Story> {
      return await this.chatService.getResponse(data);
   }

   @Get('/mcq/:id')
   async getMcqs(@Param('id') id: string): Promise<any> {
      return await this.chatService.getMcqs(id);
   }

}
