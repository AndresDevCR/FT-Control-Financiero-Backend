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
import { AuthGuard } from '@nestjs/passport';
import { BreakerService } from './breaker.service';
import { CreateBreakerDto } from './create-breaker.dto';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
@ApiTags('EPS')
@Controller('api/v1/breaker')
export class BreakerController {
  constructor(private readonly breakerService: BreakerService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createBreakerDto: CreateBreakerDto) {
    return this.breakerService.create(createBreakerDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findAll() {
    return this.breakerService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the breaker to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.breakerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateBreakerDto: CreateBreakerDto) {
    return this.breakerService.update(+id, updateBreakerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the breaker to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been deleted.',
  })
  remove(@Param('id') id: string) {
    return this.breakerService.remove(+id);
  }
}
