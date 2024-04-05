import { IsString, IsNotEmpty } from 'class-validator';

export class SendMailDto {

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly score: string;

    @IsNotEmpty()
    @IsString()
    readonly feedback: string;

}
