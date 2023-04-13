import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";

export const defaultUser= (configService : ConfigService, userService: UserService) => {
    const createUser : CreateUserDto = {
        name :  configService.get<string>('DEFAULT_USER_NAME'),
        last_name : configService.get<string>('DEFAULT_USER_LAST_NAME'),
        email : configService.get<string>('DEFAULT_USER_EMAIL'),
        password : configService.get<string>('DEFAULT_USER_PASSWORD'),
        roles : ['ADMIN']
    }
    userService.createUserDefault(createUser); //CREATE DEFAULT ADMIN USER
}