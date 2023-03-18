import { AddressModule } from './address/address.module';
import { ApplicationModule } from './application/application.module';
import { CompanyModule } from './company/company.module';
import { LocationModule } from './location/location.module';
import { PermisionsModule } from './permisions/permisions.module';
import { PhoneModule } from './phone/phone.module';
import { Profile } from './profile/user-profile.entity';
import { UserProfileModule } from './profile/user-profile.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { UserHasApplicationModule } from './user_has_application/user_has_application.module';
import { UserHasRoleModule } from './user_has_role/user_has_role.module';

export const AdministrationModules = [
  AddressModule,
  ApplicationModule,
  CompanyModule,
  LocationModule,
  PermisionsModule,
  PhoneModule,
  Profile,
  UserProfileModule,
  RolesModule,
  UsersModule,
  UserHasApplicationModule,
  UserHasRoleModule,
];
