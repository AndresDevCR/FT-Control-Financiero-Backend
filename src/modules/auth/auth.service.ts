import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../administration/users/user.entity';
import { AuthHelper } from './auth.helper';
import { UserHasRole } from '../administration/user_has_role/user_has_role.entity';
import { UserHasApplication } from '../administration/user_has_application/user_has_application.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @InjectRepository(UserHasRole)
  private repositoryUserHasRole: Repository<UserHasRole>;
  @InjectRepository(UserHasApplication)
  private repositoryUserHasApplication: Repository<UserHasApplication>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { first_name, last_name, email, password }: RegisterDto = body;
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

    return this.repository.save(user).then((user) => {
      this.repositoryUserHasRole
        .insert({
          user_id: user.id,
          role_id: body.role_id,
        })
        .then(() => {
          this.repositoryUserHasApplication.insert({
            user_id: user.id,
            application_id: body.application_id,
          });
        });
      return user;
    });
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

  public async getUser(user: User): Promise<User> {
    return this.repository.findOne({
      where: { id: user.id },
      relations: {
        profile: true,
        role: true,
        company: true
      },
    });
  }
}
