import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Sale } from "./sale.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class SalesProducts {
    @PrimaryGeneratedColumn()
    sales_products_Id: number

    @Column({type : 'numeric', nullable : false})
    quantity : number;

    @ManyToOne(() => Sale, (sale) => sale.salesProducts)
    @JoinColumn({name : 'sale_id'})
    sale: Sale

    @ManyToOne(() => Product, (product) => product.salesProducts)
    @JoinColumn({name : 'product_id'})
    product : Product
}