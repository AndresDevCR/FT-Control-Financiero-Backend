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
import { PanelService } from './panel.service';
import { CreatePanelDto } from './create-panel.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('EPS')
@Controller('api/v1/panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createPanelDto: CreatePanelDto) {
    return this.panelService.create(createPanelDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.panelService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the panel to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.panelService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the panel to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been updated.',
  })
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updatePanelDto: CreatePanelDto) {
    return this.panelService.update(+id, updatePanelDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the panel to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been deleted.',
  })
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.panelService.remove(+id);
  }
}
