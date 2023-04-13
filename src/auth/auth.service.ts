import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService : UserService, private jwtService : JwtService){

  }
  // login(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  async login(user: User) {
    const {id, ...rest} = user;
    const payload = { sub : id };
    return await {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const createUser : CreateUserDto = Object.assign(registerAuthDto, {roles : ['USER']});
    return await this.userService.create(createUser);
  }

  profile() {
    return `This action returns all auth`;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
