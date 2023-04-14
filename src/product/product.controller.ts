import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AppResources } from '../app.roles';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth({
    possession : 'any',
    action : 'create',
    resource : AppResources.PRODUCT
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productService.create(createProductDto);
    return {
      message : 'successful created product',
      data 
    };
  }

  @Get()
  async findAll() {
    const data = await this.productService.findAll();
    return {
      message : 'successful request products',
      data 
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.findOne(id);
    return {
      message : 'successful request product',
      data 
    };
  }

  @Auth({
    possession : 'any',
    action : 'update',
    resource : AppResources.PRODUCT
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const data = await this.productService.update(id, updateProductDto);
    return {
      message : 'successful edited product',
      data 
    };
  }

  @Auth({
    possession : 'any',
    action : 'delete',
    resource : AppResources.PRODUCT
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.remove(id);
    return {
      message : 'successful removed product',
      data 
    };
  }
}
