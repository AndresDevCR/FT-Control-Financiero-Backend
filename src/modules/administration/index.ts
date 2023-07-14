import { PhoneModule } from './phone/phone.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { Profile } from './profile/profile.entity';
import { CompanyModule } from './company/company.module';
import { AddressModule } from './address/address.module';
import { UserProfileModule } from './profile/profile.module';
import { ApplicationModule } from './application/application.module';
import { UserHasRoleModule } from './user_has_role/user_has_role.module';
import { UserHasApplicationModule } from './user_has_application/user_has_application.module';

export const AdministrationModules = [
  AddressModule,
  ApplicationModule,
  CompanyModule,
  PhoneModule,
  Profile,
  UserProfileModule,
  RolesModule,
  UsersModule,
  UserHasApplicationModule,
  UserHasRoleModule,
];
