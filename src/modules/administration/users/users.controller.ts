import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { CreateUserDto } from './create-user.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Auth')
@Controller('api/v1/user')
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
    @Req() { user }: Request,
    @Query('PageNumber') pageNumber,
    @Query('PageSize') pageSize,
    @Query('SearchByName') searchByName,
    @Query('SearchByCompany') searchByCompany,
    @Query('SearchByRole') searchByRole,
  ): Promise<object | any> {
    return this.usersService.findAll(
      <User>user,
      pageNumber,
      pageSize,
      searchByName,
      searchByCompany,
      searchByRole,
    );
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
    type: CreateUserDto,
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the user to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(+id, updateUserDto);
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
    type: CreateUserDto,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
