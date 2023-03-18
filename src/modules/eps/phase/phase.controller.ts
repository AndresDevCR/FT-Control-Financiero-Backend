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
import { PhaseService } from './phase.service';
import { CreatePhaseDto } from './create-phase.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('EPS')
@Controller('api/v1/phase')
export class PhaseController {
  constructor(private readonly phaseService: PhaseService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createPhaseDto: CreatePhaseDto) {
    return this.phaseService.create(createPhaseDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.phaseService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the phase to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.phaseService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the phase to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been updated.',
  })
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updatePhaseDto: CreatePhaseDto) {
    return this.phaseService.update(+id, updatePhaseDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the phase to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been deleted.',
  })
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.phaseService.remove(+id);
  }
}
