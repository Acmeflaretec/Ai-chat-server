import { Controller, Get, Param } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) { }

  @Get('send-mail/:to')
  public sendMail(@Param('to') email: string) {
    const data = {
      username: "Testuser",
      email,
      score: "8",
      feedback: "It is great that your child showed interest in the story \"The Legend of Inferno\" and attempted to answer the questions. However, it seems like there were some confusion and misunderstanding in the answers provided. \n\nI would recommend reading the story again with your child and discussing the key points such as the name of the dragon, its abilities, the relationship between Inferno and Aria, and the message of love and friendship that the story conveys. Encouraging your child to think critically and understand the deeper meanings of the story can help improve their comprehension skills. Additionally, practicing more reading comprehension exercises together can help strengthen their overall understanding and analytical thinking. \n\nOverall, it is important to provide positive reinforcement and support for your child's learning journey, while also offering guidance and encouragement to help them improve their thinking and understanding abilities. Keep up the good work in fostering a love for reading and learning in your child.",
    }
    this.mailingService.sendMail(data);
  }
}
