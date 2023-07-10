import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '../administration/users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: User,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  private async register(@Body() body: RegisterDto): Promise<object | never> {
    await this.authService.register(body);

    return { status: 200, msg: 'The record has been successfully created.' };
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description:
      'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhbmRyZXMudmFyZ2FzQGZ1c2lvbnRlY2gucHJvIiwiaWF0IjoxNjg4OTYzNDc3LCJleHAiOjE3MjA0OTk0Nzd9.xNgUnt-JuwffO1FfOkoa0X3utKRm4P73x4VMj7vPMBQ',
    type: String,
  })
  private async login(@Body() body: LoginDto) {
    return {
      token: await this.authService.login(body),
    };
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description:
      'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJBbmRyZXMudmFyZ2FzQGZ1c2lvbnRlY2gucHJvIiwiaWF0IjoxNjc4MTQzNTQ1LCJleHAiOjE3MDk2Nzk1NDV9.aAcGERuXBKjv6lzX3ABccc-eZcKVfOJ6p4Jg12DRLZg',
    type: String,
  })
  private async refresh(@Req() { user }: Request): Promise<object | never> {
    return {
      token: await this.authService.refresh(<User>user),
    };
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description:
      'Return the user logged with his roles, profile and applications associated',
    type: User,
  })
  private async getUser(@Req() { user }: Request): Promise<object | never> {
    return this.authService.getUser(<User>user);
  }
}
