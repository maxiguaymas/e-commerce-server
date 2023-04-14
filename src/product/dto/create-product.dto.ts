import { IsEnum, IsNumber, IsString } from "class-validator";
import { ProductCategory } from "../enums/product-category.enum";
import { EnumToString } from "../../helpers/enumToString";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    name : string;

    @ApiProperty()
    @IsString()
    description : string;

    @ApiProperty({example : EnumToString(ProductCategory)})
    @IsEnum(ProductCategory, {
        message : `invalid option category. the correct options are ${ EnumToString(ProductCategory)}.`
    })
    category : ProductCategory;

    @ApiProperty()
    @IsNumber()
    price : number;

    @ApiProperty()
    @IsNumber()
    stock : number;

}
