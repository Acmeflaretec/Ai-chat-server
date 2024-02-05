import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OpenAI } from 'openai'
@Injectable()
export class AppService {

 private openai = new OpenAI({
    apiKey: process.env.API_KEY
  });
  async getResponse(message: string): Promise<any> {
    return new Promise((resolve) => {
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: message },
        ],
      })
        .then((completion) => {
          console.log('xomp', completion)
          if (completion?.choices[0]?.message !== null) {
            console.log(completion.choices[0].message)
            resolve(completion.choices[0].message)
          } else {
            throw new InternalServerErrorException('Failed to Generate response!')
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          throw new InternalServerErrorException(error)
        });
    });
  }
}
