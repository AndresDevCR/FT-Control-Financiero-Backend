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
import { ElectricFacilityService } from './electric_facility.service';
import { CreateElectricFacilityDto } from './create-electric_facility.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Poles')
@Controller('api/v1/electric-facility')
export class ElectricFacilityController {
  constructor(
    private readonly electricFacilityService: ElectricFacilityService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateElectricFacilityDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createElectricFacilityDto: CreateElectricFacilityDto) {
    return this.electricFacilityService.create(createElectricFacilityDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [CreateElectricFacilityDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.electricFacilityService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateElectricFacilityDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.electricFacilityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: CreateElectricFacilityDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateElectricFacilityDto: CreateElectricFacilityDto,
  ) {
    return this.electricFacilityService.update(+id, updateElectricFacilityDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.electricFacilityService.remove(+id);
  }
}
