import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from 'src/app.roles';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository : Repository<User>,
    @InjectRolesBuilder() private readonly rolesBuilder : RolesBuilder
    ){

  }

  adminOrUser(user: User, id : number): boolean{
    if(this.rolesBuilder.can(user.roles).updateAny(AppResources.USER).granted){
      return true; // is admin
    }
    if(user.id != id){
      throw new NotFoundException('Unauthorized')
    }
    return false;
  }

  async createUserDefault(createUserDto : CreateUserDto){
    const userExists = await this.userRepository.findOneBy({email : createUserDto.email});
    if(userExists){
      return;
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOneBy({email : createUserDto.email});
    if(userExists){
      throw new NotFoundException('Email registered')
    }
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      relations : ['sales','sales.salesProducts.product']
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.find({
      where : {id},
      relations : ['sales','sales.salesProducts.product']
    });

    if(user.length <= 0){
      throw new NotFoundException('User does not exist.')
    }
    return user[0];
  }

  async findOneByEmail(email : string){
    return await this.userRepository
    .createQueryBuilder('user')
    .where({email})
    .addSelect('user.password')
    .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const editedSale = Object.assign(user, updateUserDto);

    return await this.userRepository.save(editedSale);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}
