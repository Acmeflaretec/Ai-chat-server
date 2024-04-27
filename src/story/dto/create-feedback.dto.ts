import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {

    @IsString()
    readonly userId: string;

    @IsNotEmpty()
    @IsString()
    readonly storyId: string;

    @IsNotEmpty()
    @IsString()
    readonly score: string;

    @IsNotEmpty()
    @IsString()
    readonly image: string;

    @IsNotEmpty()
    readonly ans: string[];

}
