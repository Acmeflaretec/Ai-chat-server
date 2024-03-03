import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OpenAI } from 'openai'
@Injectable()
export class ChatService {

 private openai = new OpenAI({
    apiKey: process.env.API_KEY
  });
  async getResponse(message: string): Promise<any> {
    return new Promise((resolve) => {
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `Write a story about "${message}" and response should have a name of story seperated by a "," and content of story.` },
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
  
  async testResponse(message: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(function () {
        var a = 1;
        resolve({
          role: 'assistant',
          content: "Luna and Leo, Once upon a time, in a vast and untamed wilderness, there lived a wise and solitary gray wolf named Luna and a majestic lion named Leo who ruled over the grassy savannah. Despite their differences, Luna and Leo shared a unique connection that went beyond the boundaries of their respective territories. One day, a severe drought struck the land, causing a scarcity of prey and water. The once-lush landscapes transformed into arid expanses, leaving both Luna and Leo struggling to survive. The shortage of resources led to tensions among the various animal communities, and conflicts arose as everyone competed for the limited sustenance available. Luna, known for her cunning and resourcefulness, observed the growing animosity among the animals. Recognizing the need for cooperation, she decided to seek out Leo, the mighty lion, in hopes of finding a solution to the escalating crisis. Approaching Leo's territory, Luna was met with skepticism from the lion and his pride. Lions were proud creatures, and Leo initially dismissed Luna's proposal for a united effort to address the challenges brought on by the drought. However, Luna persisted, sharing her insights on how their collaboration could benefit everyone. She spoke of the delicate balance of nature and how, in times of adversity, unity could bring strength. Leo, impressed by Luna's wisdom and understanding, agreed to set aside his pride and join forces. Together, Luna and Leo worked to establish a temporary truce among the animals of the wilderness. They organized a system for sharing the remaining resources, ensuring that each species had enough to survive the harsh conditions. The once-hostile territories became spaces of collaboration and mutual support. As they navigated the challenges of the drought side by side, Luna and Leo developed a deep respect for one another. Luna admired Leo's strength and leadership, while Leo valued Luna's intelligence and strategic thinking. Their alliance proved to be a turning point for the entire wilderness, as the different animal communities learned to coexist harmoniously. Eventually, the drought subsided, and the land began to recover. The unity fostered by Luna and Leo endured, creating a lasting bond among the creatures of the wilderness. The wolf and lion, once seen as unlikely allies, became symbols of cooperation and understanding, reminding all who witnessed their tale that even the fiercest of rivals could find common ground in the face of adversity. And so, with newfound harmony, the wilderness flourished once more, thanks to the enduring friendship between Luna the wolf and Leo the lion.",
        });
      }, 4000);

    });
  }
}



