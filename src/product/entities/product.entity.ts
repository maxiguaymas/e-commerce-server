import { SalesProducts } from "../../sale/entities/sales-products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'varchar', length : 150, nullable : false})
    name : string;

    @Column({type : 'text', nullable: false})
    description : string;

    @Column({type : 'varchar', length : 50 , nullable : true})
    category : string;

    @Column({type : 'double precision', nullable : false})
    price : number;

    @Column({type : 'numeric', nullable : false})
    stock : number;

    @OneToMany(() => SalesProducts, (salesProducts) => salesProducts.product, {cascade: true})
    public salesProducts: SalesProducts[];

}   
