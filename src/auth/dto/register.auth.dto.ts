import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class RegisterAuthDto {

    @ApiProperty()
    @IsString()
    name : string;

    @ApiProperty()
    @IsString()
    last_name : string;

    @ApiProperty()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsString()
    password : string;

}