import { hash } from "bcrypt";
import { Sale } from "src/sale/entities/sale.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column({type : 'varchar', length : 150, nullable : false})
    name : string;

    @Column({type : 'varchar', length : 150, nullable : false})
    last_name : string;

    @Column({type : 'varchar', length : 255, nullable : false})
    email : string;

    @Column({type : 'varchar', length : 150, nullable : false, select : false})
    password : string;

    @OneToMany(() => Sale, (sale) => sale.user, {cascade : true})
    sales : Sale[];

    @Column({type : 'simple-array'})
    roles : string[];

    @CreateDateColumn({name : 'create_at',type : 'timestamp', nullable : true})
    createAt : Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){
            return;
        }

        this.password = await hash(this.password, 10);
    }
}
