import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export enum AppResources {
    USER = 'USER',
    SALE = 'SALE',
    PRODUCT = 'PRODUCT'
}
  
export const roles: RolesBuilder = new RolesBuilder();
  
roles
// USER ROLES
.grant(AppRoles.USER) 
    .readAny(AppResources.USER)
    .updateOwn(AppResources.USER) 
    .deleteOwn(AppResources.USER)
    .readOwn(AppResources.SALE)
    .createOwn(AppResources.SALE)
    .deleteOwn(AppResources.SALE)
//ADMIN ROLES
.grant(AppRoles.ADMIN)
    .extend(AppRoles.USER)
    .readAny([AppResources.SALE])
    .createAny([AppResources.PRODUCT, AppResources.USER])
    .updateAny([AppResources.PRODUCT, AppResources.USER])
    .deleteAny([AppResources.PRODUCT, AppResources.USER])
;