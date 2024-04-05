// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './send-mail.dto';

@Injectable()
export class MailingService {
  
  constructor(private mailerService: MailerService) { }
  async sendMail(data: SendMailDto) {
    const { email, username, feedback, score } = data
    this.mailerService.sendMail({
      to: email,
      subject: 'Participated in Quiz',
      template: './welcome',
      context: {
        name: username,
        score,
        feedback
      },
    })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
