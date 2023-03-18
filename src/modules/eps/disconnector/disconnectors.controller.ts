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
import { DisconnectorsService } from './disconnectors.service';
import { CreateDisconnectorDto } from './create-disconnector.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('EPS')
@Controller('api/v1/disconnector')
export class DisconnectorsController {
  constructor(private readonly disconnectorsService: DisconnectorsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createDisconnectorDto: CreateDisconnectorDto) {
    return this.disconnectorsService.create(createDisconnectorDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findAll() {
    return this.disconnectorsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.disconnectorsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateDisconnectorDto: CreateDisconnectorDto,
  ) {
    return this.disconnectorsService.update(+id, updateDisconnectorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.disconnectorsService.remove(+id);
  }
}
