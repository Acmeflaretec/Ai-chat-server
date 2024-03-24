import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ResponseDto } from "src/GlobalDto/response.dto";

@Controller('user')
export class UserController {
  constructor(private authService: UserService) { }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ResponseDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get()
  async getOneById(): Promise<ResponseDto> {
    return await this.authService.getUsers();
  }
  @Post('/update/:id')
  async updateUser(@Body() authCredentialsDto: AuthCredentialsDto, @Param('id') id: string): Promise<ResponseDto> {
    return await this.authService.updateUser(id, authCredentialsDto);
  }
  // @Get('/author/:id')
  // async getOneById(@Param('id') id: string): Promise<Story> {
  //     return await this.storyService.getOneById(id);
  // }
  // @Get('/likes/:id')
  // async getOneById(@Param('id') id: string): Promise<Story> {
  //     return await this.storyService.getOneById(id);
  // }
}