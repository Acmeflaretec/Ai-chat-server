import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StoryService } from './story.service';
import { Story } from './story.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './feedback.entity';

@Controller('story')
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Get()
    async getStories(@Query() filter: Record<string, any>): Promise<Story[]> {
        return await this.storyService.getStory(filter);
    }
    @Get('/feedback')
    async getFeedbacks(): Promise<Feedback[]> {
        return await this.storyService.getFeedbacks();
    }

    @Get('/:id')
    async getOneById(@Param('id') id: string): Promise<Story> {
        return await this.storyService.getOneById(id);
    }
    @Get('/delete/:id')
    async deleteOne(@Param('id') id: string): Promise<any> {
        return await this.storyService.deleteStory(id);
    }

    @Post('/check')
    async CheckFeedback(@Body() data: CreateFeedbackDto): Promise<Feedback> {
        return await this.storyService.CheckFeedback(data);
    }
    @Post('/feedback')
    async CreateFeedback(@Body() data: CreateFeedbackDto): Promise<Feedback> {
        return await this.storyService.CreateFeedback(data);
    }

}
