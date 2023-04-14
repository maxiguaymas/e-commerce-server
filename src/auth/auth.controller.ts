import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserEntity} from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register.auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @User() user : UserEntity,
    @Body() loginAuthDto: LoginAuthDto
    ) 
  {
    const data = await this.authService.login(user);
    return {
      message : 'successful login',
      data
    };
  }

  @Post('register')
  async register(@Body() registerAuthDto : RegisterAuthDto) {

    const data = await this.authService.register(registerAuthDto);
    return {
      message : 'successful register',
      data
    }
  }

  @Auth()
  @Get('profile')
  profile() {
    return this.authService.profile();
  }

}
