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
import { StatusService } from './status.service';
import { CreateStatusDto } from './create-status.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Ticket System')
@Controller('api/v1/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateStatusDto,
  })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: CreateStatusDto,
  })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the status to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: CreateStatusDto,
  })
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the status to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreateStatusDto,
  })
  update(@Param('id') id: string, @Body() updateStatusDto: CreateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the status to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: CreateStatusDto,
  })
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
