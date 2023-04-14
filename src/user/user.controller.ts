import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AppResources } from '../app.roles';
import { User } from '../decorators/user.decorator';
import { User as UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

  @Auth({
    possession : 'any',
    action : 'create',
    resource : AppResources.USER
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return {
      message : 'successful create user',
      data 
    };
  }

  @Auth({
    possession : 'own',
    action : 'read',
    resource : AppResources.USER
  })
  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return {
      message : 'successful request users',
      data 
    };
  }

  @Auth({
    possession : 'own',
    action : 'read',
    resource : AppResources.USER
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOne(id);
    return {
      message : 'successful request user',
      data 
    };
  }

  @Auth({
    possession : 'own',
    action : 'update',
    resource : AppResources.USER
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @User() user : UserEntity) {

    if(this.userService.adminOrUser(user,id)){
      const data = await this.userService.update(id, updateUserDto);
      return {
        message : 'successful edited user',
        data 
      };
    }
    else{
      const data = await this.userService.update(id, updateUserDto);
      return {
        message : 'successful edited user',
        data 
      };
    }
  }

  @Auth({
    possession : 'own',
    action : 'delete',
    resource : AppResources.USER
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number,@User() user : UserEntity) {
    if(this.userService.adminOrUser(user,id)){
      const data = await this.userService.remove(id);
      return {
        message : 'successful removed user',
        data 
      };
    }
    else{
      const data = await this.userService.remove(id);
      return {
        message : 'successful removed user',
        data 
      };
    }
  }
}
