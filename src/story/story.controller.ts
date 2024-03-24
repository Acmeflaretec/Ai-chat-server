import { Body, Controller, Get, Param } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from './story.entity';

@Controller('story')
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Get()
    async getStories(): Promise<Story[]> {
        return await this.storyService.getStory();
    }

    @Get('/:id')
    async getOneById(@Param('id') id: string): Promise<Story> {
        return await this.storyService.getOneById(id);
    }
    @Get('/delete/:id')
    async deleteOne(@Param('id') id: string): Promise<any> {
        return await this.storyService.deleteStory(id);
    }

}
