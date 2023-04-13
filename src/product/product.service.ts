import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository : Repository<Product>){}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto as any);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({id});
    if(!product) {
      throw new NotFoundException('Product does not exist.')
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    const editedProduct = Object.assign(product, updateProductDto);
    
    return await this.productRepository.save(editedProduct);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }

  async findOneAndUpdateStock (id : number, quantity : number){
    let product = await this.findOne(id);

    if(product.stock >= quantity){
      product.stock -= quantity;
      this.productRepository.save(product);
    }
    else{
      throw new NotFoundException(`quantity must be less than or equal to product (${product.name}) stock(${product.stock})`)
    }

    return product;
  }
}
