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
import { MechanicFacilityService } from './mechanic_facility.service';
import { CreateMechanicFacilityDto } from './create-mechanic_facility.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Poles')
@Controller('/api/v1/mechanic-facility')
export class MechanicFacilityController {
  constructor(
    private readonly mechanicFacilityService: MechanicFacilityService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateMechanicFacilityDto })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() createMechanicFacilityDto: CreateMechanicFacilityDto) {
    return this.mechanicFacilityService.create(createMechanicFacilityDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.mechanicFacilityService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.mechanicFacilityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateMechanicFacilityDto })
  @ApiResponse({ status: 200, description: 'Ok' })
  update(
    @Param('id') id: string,
    @Body() updateMechanicFacilityDto: CreateMechanicFacilityDto,
  ) {
    return this.mechanicFacilityService.update(+id, updateMechanicFacilityDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Ok' })
  remove(@Param('id') id: string) {
    return this.mechanicFacilityService.remove(+id);
  }
}
