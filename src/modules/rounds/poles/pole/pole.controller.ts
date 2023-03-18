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
import { PoleService } from './pole.service';
import { CreatePoleDto } from './create-pole.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Poles')
@Controller('/api/v1/pole')
export class PoleController {
  constructor(private readonly poleService: PoleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreatePoleDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createPoleDto: CreatePoleDto) {
    return this.poleService.create(createPoleDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [CreatePoleDto],
  })
  findAll() {
    return this.poleService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatePoleDto,
  })
  findOne(@Param('id') id: string) {
    return this.poleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreatePoleDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updatePoleDto: CreatePoleDto) {
    return this.poleService.update(+id, updatePoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.poleService.remove(+id);
  }
}
