import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../administration/users/user.entity';
import { AuthHelper } from './auth.helper';
import { UserHasRole } from '../administration/user_has_role/user_has_role.entity';
import { UserHasApplication } from '../administration/user_has_application/user_has_application.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(UserHasRole)
    private repositoryUserHasRole: Repository<UserHasRole>,
    @InjectRepository(UserHasApplication)
    private repositoryUserHasApplication: Repository<UserHasApplication>,
    private readonly helper: AuthHelper,
  ) {}

  public async register(body: RegisterDto): Promise<User> {
    const {
      first_name,
      last_name,
      email,
      password,
      company_id,
      role_id,
      company_start_date,
    } = body;

    const existingUser: User = await this.repository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException(
        'El email ya esta en uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = this.repository.create({
      first_name,
      last_name,
      email,
      password: this.helper.encodePassword(password),
      company_id,
      role_id,
      company_start_date,
    });

    return this.repository.save(newUser);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password } = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Usuario o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Usuario o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.repository.update(user.id, { last_login: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    await this.repository.update(user.id, { last_login: new Date() });

    return this.helper.generateToken(user);
  }

  public async editUser(userId: number, body: RegisterDto): Promise<User> {
    const user: User = await this.repository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const {
      first_name,
      last_name,
      email,
      password,
      company_id,
      role_id,
      company_start_date,
    } = body;

    if (email !== user.email) {
      const existingUser: User = await this.repository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new HttpException(
          'El email ya esta en uso',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (first_name) {
      user.first_name = first_name;
    }

    if (last_name) {
      user.last_name = last_name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = this.helper.encodePassword(password);
    }

    if (company_id) {
      // Si hay lógica adicional o validaciones aquí para el company_id, puedes implementarla
      user.company_id = company_id;
    }

    if (role_id) {
      // Si hay lógica adicional o validaciones aquí para el role_id, puedes implementarla
      user.role_id = role_id;
    }

    if (company_start_date) {
      // Si hay lógica adicional o validaciones aquí para el company_start_date, puedes implementarla
      user.company_start_date = company_start_date;
    }

    await this.repository.save(user);

    return user;
  }

  public async getUser(user: User): Promise<User> {
    return this.repository.findOne({
      where: { id: user.id },
      relations: {
        profile: true,
        role: true,
        company: true,
      },
    });
  }
}
