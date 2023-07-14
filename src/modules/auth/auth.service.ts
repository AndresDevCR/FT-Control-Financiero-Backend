import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { AuthHelper } from './auth.helper';
import { User } from '../administration/users/user.entity';
import { Profile } from '../administration/profile/profile.entity';
import { UpdateUserDto } from '../administration/users/update-user.dto';
import { UserHasRole } from '../administration/user_has_role/user_has_role.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @InjectRepository(Profile)
  private repositoryUserProfile: Repository<Profile>;
  @InjectRepository(UserHasRole)
  private repositoryUserHasRole: Repository<UserHasRole>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    console.log(body.applications);
    const {
      first_name,
      last_name,
      email,
      password,
      company_start_date,
      company_id,
    }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException(
        'Invalid request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    user = new User();

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.company_start_date = company_start_date;
    user.company_id = company_id;

    return this.repository.save(user).then((user) => {
      this.repositoryUserProfile
        .insert({
          user_id: user.id,
        })
        .then(() => {
          body.applications.forEach((application) => {
            console.log(application);
            this.repositoryUserHasRole.save({
              user_id: user.id,
              role_id: application.role_id,
            });
          });
        });
      return user;
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { applications, ...userFields } = updateUserDto;
    if (userFields.password) {
      userFields.password = this.helper.encodePassword(userFields.password);
    }

    const updatedUser = await this.repository
      .createQueryBuilder('user')
      .update(userFields)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    await this.repositoryUserHasRole.manager.transaction(async (manager) => {
      await manager.delete(UserHasRole, { user_id: id });
      await Promise.all(
        applications.map((application) =>
          manager.insert(UserHasRole, {
            user_id: id,
            role_id: application.role_id,
          }),
        ),
      );
    });
    return updatedUser.raw;
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Invalid User or Password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid User or Password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.repository.update(user.id, { last_login: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { last_login: new Date() });

    return this.helper.generateToken(user);
  }

  public async getUser(user: User) {
    return await this.repository.findOne({
      where: { id: user.id },
      relations: ['profile', 'company', 'module', 'applications.role'],
    });
  }
}
