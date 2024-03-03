import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
   constructor(private readonly chatService: ChatService) { }

   @Post()
   async getResponse(@Body() data: { prompt: string }): Promise<any> {
      console.log(data.prompt);
      return await this.chatService.getResponse(data.prompt);
   }

   @Post('/test')
   async testResponse(@Body() data: { prompt: string }): Promise<any> {
      console.log(data);
      return await this.chatService.testResponse(data.prompt);
   }
}
