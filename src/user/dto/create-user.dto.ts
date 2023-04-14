import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";
import { EnumToString } from "../../helpers/enumToString";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    name : string;

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    last_name : string;

    @ApiProperty()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password : string;

    @ApiProperty()
    @IsArray()
    @IsEnum(AppRoles, {
        each : true,
        message : `must be a valid role value, ${ EnumToString(AppRoles)}`
    })
    roles : string[];
}
