import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto, ProductAndQuantity } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SalesProductsService } from './sales-products.service';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from '../app.roles';

@Injectable()
export class SaleService {

  constructor(
    @InjectRepository(Sale) private saleRepository : Repository<Sale>,
    @InjectRolesBuilder() private readonly rolesBuilder : RolesBuilder,
    private salesProductsService : SalesProductsService
    ){}

  adminOrUser(user: User, id : number): boolean{
    if(this.rolesBuilder.can(user.roles).readAny(AppResources.SALE).granted){
      return true; // is admin
    }
    const result = user.sales.filter((sale) => {return sale.id === id});
    if(result.length<1){
      throw new NotFoundException('Unauthorized')
    }
    return false;
  }

  async create(createSaleDto: CreateSaleDto, user : User) {
    this.checkSale(createSaleDto.products_and_quantitys);
    let sale = new Sale();
    sale.user = user;
    sale.shipping_address = createSaleDto.shipping_address;
    sale.total_price = createSaleDto.total_price;
    const saveSale = await this.saleRepository.save(sale);
    await this.salesProductsService.createSalesProductsList(createSaleDto.products_and_quantitys, saveSale)
    delete saveSale.user.sales;
    return saveSale;
  }

  checkSale(productsAndQuantities : ProductAndQuantity[]){
    let check = null;
    for (const prodAndQuan of productsAndQuantities){
      if(prodAndQuan.product_id > 0 && prodAndQuan.quantity > 0){
        check = true;
      }
      else{
        check = false;
        break;
      }
    }

    if(!check) throw new NotFoundException('Products and Quantities invalid.');
  }

  async findAll() { 
    return await this.saleRepository.find({
      relations : ['salesProducts','salesProducts.product']
    });
  }

  async findOne(id: number) {
    const sale = await this.saleRepository.find({
      where : {id},
      relations : ['salesProducts','salesProducts.product']
    });

    if(sale.length <= 0){
      throw new NotFoundException('Sale does not exist.')
    }
    return sale[0];
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    let sale = await this.findOne(id);
    if(!sale){
      throw new NotFoundException('Sale does not exist.')
    }
    //sale.products = await this.getProducts(updateSaleDto.products_id)
    //delete updateSaleDto.products_id;
    const editedSale = Object.assign(sale, updateSaleDto);

    return await this.saleRepository.save(editedSale)
  }

  async remove(id: number) {
    const sale = await this.findOne(id);
    await this.salesProductsService.removeSalesProducts(sale); //remove relations
    return await this.saleRepository.delete(id);
  }

}
