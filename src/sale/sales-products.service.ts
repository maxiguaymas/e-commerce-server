import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesProducts } from './entities/sales-products.entity';
import { Sale } from './entities/sale.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductAndQuantity } from './dto/create-sale.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class SalesProductsService {

    constructor(
        @InjectRepository(SalesProducts) private salesProductsRepository : Repository<SalesProducts>,
        @InjectRepository(Product) private productRepository : Repository<Product>,
        private productService : ProductService
        ){}
    
    async createSalesProductsList(ProductsAndQuantities : ProductAndQuantity[], sale : Sale){
        for(const productAndQuantity of ProductsAndQuantities){
            let saleProduct = new SalesProducts();
            saleProduct.product = await this.productService.findOneAndUpdateStock(productAndQuantity.product_id, productAndQuantity.quantity)
            saleProduct.quantity = productAndQuantity.quantity;
            saleProduct.sale = sale;
            const saveSaleProducts = await this.salesProductsRepository.save(saleProduct);
        }
    }

    async removeSalesProducts(sale : Sale){
        for(const saleProduct of sale.salesProducts){
            await this.salesProductsRepository.delete(saleProduct.sales_products_Id);
        }
    }
}
