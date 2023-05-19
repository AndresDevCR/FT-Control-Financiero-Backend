import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PermisionsService } from './permisions.service';
import { CreatePermisionDto } from './create-permision.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('permision')
export class PermisionsController {
  constructor(private readonly permisionsService: PermisionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'Permision created' })
  create(@Body() createPermisionDto: CreatePermisionDto) {
    return this.permisionsService.create(createPermisionDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Get all permisions' })
  findAll() {
    return this.permisionsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The id of the permision to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Get one permision' })
  @ApiResponse({ status: 404, description: 'Permision not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.permisionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The id of the permision to update',
  })
  @ApiResponse({ status: 200, description: 'Permision updated' })
  update(
    @Param('id') id: string,
    @Body() updatePermisionDto: CreatePermisionDto,
  ) {
    return this.permisionsService.update(+id, updatePermisionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The id of the permision to delete',
  })
  @ApiResponse({ status: 200, description: 'Permision deleted' })
  remove(@Param('id') id: string) {
    return this.permisionsService.remove(+id);
  }
}
