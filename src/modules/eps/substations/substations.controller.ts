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
import { SubstationsService } from './substations.service';
import { CreateSubstationDto } from './create-substation.dto';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('EPS')
@Controller('api/v1/substations')
export class SubstationsController {
  constructor(private readonly substationsService: SubstationsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createSubstationDto: CreateSubstationDto) {
    return this.substationsService.create(createSubstationDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findAll() {
    return this.substationsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the substation to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.substationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the substation to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSubstationDto: CreateSubstationDto,
  ) {
    return this.substationsService.update(+id, updateSubstationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the substation to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been deleted.',
  })
  remove(@Param('id') id: string) {
    return this.substationsService.remove(+id);
  }
}
