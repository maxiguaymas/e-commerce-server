import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { User} from 'src/decorators/user.decorator';
import { User as UserEntity} from 'src/user/entities/user.entity';
import { AppResources } from 'src/app.roles';

@ApiTags('Sales')
@Controller('sale')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
    ) {}

  @Auth({
    possession : 'own',
    action : 'create',
    resource : AppResources.SALE
  })
  @Post()
  async create(
    @User() user : UserEntity,
    @Body() createSaleDto: CreateSaleDto
    ) {
    const data = await this.saleService.create(createSaleDto, user);
    return {
      message : 'successful sale',
      data 
    };
  }

  @Auth({
    possession : 'any',
    action : 'read',
    resource : AppResources.SALE
  })
  @Get()
  async findAll() {
    const data = await this.saleService.findAll();
    return {
      message : 'successful request sales',
      data 
    };
  }

  @Auth({
    possession : 'own',
    action : 'read',
    resource : AppResources.SALE
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @User() user : UserEntity,) {

    if(this.saleService.adminOrUser(user,id)){
      const data = await this.saleService.findOne(id);
      return {
        message : 'successful request sale',
        data 
      };
    }
    else{
      const data = await this.saleService.findOne(id);
      return {
        message : 'successful request sale',
        data 
      };
    }

  }

  // @Put(':id')
  // async update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto) {
  //   const data = await this.saleService.update(id, updateSaleDto);
  //   return {
  //     message : 'successful edited sale',
  //     data 
  //   };
  // }

  @Auth({
    possession : 'own',
    action : 'delete',
    resource : AppResources.SALE
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @User() user : UserEntity,) {

    if(this.saleService.adminOrUser(user,id)){
      const data = await this.saleService.remove(id);
      return {
        message : 'successful removed sale',
        data 
      };
    }
    else{
      const data = await this.saleService.remove(id);
      return {
        message : 'successful removed sale',
        data 
      };
    }

  }
}
