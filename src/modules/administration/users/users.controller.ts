import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from '../../auth/auth.guard';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Return the user logged with his roles and applications',
    type: User,
  })
  private async findAll(
    @Headers('x-company-id') company,
  ): Promise<object | any> {
    return this.usersService.findAll(company);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the user to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Headers('x-company-id') company) {
    return this.usersService.findOne(+id, company);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the user to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
