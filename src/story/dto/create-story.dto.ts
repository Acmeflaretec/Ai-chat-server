import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoryDto {

    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    readonly prompt: string;

}
