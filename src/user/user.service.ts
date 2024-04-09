import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ResponseDto } from 'src/GlobalDto/response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
   ) { }

   async signUp(authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
      const user: Users = this.usersRepository.create();
      const { username, password, email } = authCredentialsDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      Object.assign(user, {
         username,
         password: hashedPassword,
         email,
      });
      console.log(user);
      try {
         const data = await this.usersRepository.save(user);
         return { message: 'registration successfull', statusCode: 200, data };
      } catch (error) {
         if (error.code === '23505') {
            throw new ConflictException('User already exists');
         } else {
            throw new InternalServerErrorException(error.message);
         }
      }
   }

   async signIn(
      authCredentialsDto: AuthCredentialsDto,
   ): Promise<ResponseDto> {
      const { password, email } = authCredentialsDto;
      const data = await this.usersRepository.findOneBy({ email });
      if (data && (await bcrypt.compare(password, data.password))) {
         return { message: 'login successfull', statusCode: 200, data };
      }
      throw new UnauthorizedException('please check your credentials');
   }

   async getUsers(): Promise<ResponseDto> {
      const data = await this.usersRepository.find({ relations: ['stories'] })
      if (!data) {
         throw new NotFoundException('user not found');
      }
      return { data, statusCode: 200, message: 'users fetched successfully' };
   }

   async getUserById(id: string,populate:string): Promise<ResponseDto> {
      const data = await this.usersRepository.findOne({ 
         where: { id }, 
         relations: [populate] 
       });
       
      if (!data) {
         throw new NotFoundException('user not found');
      }
      return { data, statusCode: 200, message: 'users fetched successfully' };
   }

   async updateUser(id: string, authCredentialsDto: AuthCredentialsDto): Promise<ResponseDto> {
      const { name, nickname, gender, dob } = authCredentialsDto;
      const user = await this.usersRepository.findOne({
         where: { id },
      });
      console.log(user);
      if (!user) {
         throw new NotFoundException('user not found');
      }
      Object.assign(user, {
         name,
         nickname,
         gender,
         dob,
      });
      const data = await this.usersRepository.save(user);
      return { data, statusCode: 200, message: 'user updated successfully' };
   }
}
