import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SalesProducts } from "./sales-products.entity";

@Entity('sales')
export class Sale {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'varchar', length : 250, nullable : false})
    shipping_address : string;

    @Column({type : 'numeric', nullable : false})
    total_price : number;

    @OneToMany(() => SalesProducts, (salesProducts) => salesProducts.sale, {cascade : true})
    //public salesProducts: SalesProducts[];
    salesProducts : SalesProducts[];

    @CreateDateColumn({name : 'create_at',type : 'timestamp'})
    createAt : Date;

    @ManyToOne(() => User, (user) => user.sales)
    @JoinColumn({name : 'user_id'})
    user : User;

}
