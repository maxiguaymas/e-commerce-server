import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString} from "class-validator";

export class ProductAndQuantity{    
    
    @ApiProperty()
    @IsNumber()
    quantity : number;

    @ApiProperty()
    @IsNumber()
    product_id : number;
}

export class CreateSaleDto {
    // @IsString()
    // name : string;

    @ApiProperty()
    @IsString()
    shipping_address : string;

    @ApiProperty()
    @IsNumber()
    total_price : number;

    @ApiProperty({example : `[{quantity : 1; product_id : 1;},{quantity : 1; product_id : 2;}]`})
    @IsArray()
    products_and_quantitys: ProductAndQuantity[];
}
