import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async getResponse(@Body() data: { message: string }): Promise<any> {
    return await this.appService.getResponse(data.message);
  }
}
