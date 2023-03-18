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
import { VoltageService } from './voltage.service';
import { CreateVoltageDto } from './create-voltage.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('EPS')
@Controller('api/v1/voltage')
export class VoltageController {
  constructor(private readonly voltageService: VoltageService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createVoltageDto: CreateVoltageDto) {
    return this.voltageService.create(createVoltageDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findAll() {
    return this.voltageService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the voltage to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.voltageService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the voltage to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been updated.',
  })
  update(@Param('id') id: string, @Body() updateVoltageDto: CreateVoltageDto) {
    return this.voltageService.update(+id, updateVoltageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.voltageService.remove(+id);
  }
}
