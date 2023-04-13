import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { SalesProducts } from './entities/sales-products.entity';
import { SalesProductsService } from './sales-products.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Sale, Product, SalesProducts, User])],
  controllers: [SaleController],
  providers: [SaleService, SalesProductsService, ProductService, UserService]
})
export class SaleModule {}
