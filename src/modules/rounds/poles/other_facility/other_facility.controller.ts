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
import { OtherFacilityService } from './other_facility.service';
import { CreateOtherFacilityDto } from './create-other_facility.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/other-facility')
@ApiTags('Poles')
export class OtherFacilityController {
  constructor(private readonly otherFacilityService: OtherFacilityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOtherFacilityDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createOtherFacilityDto: CreateOtherFacilityDto) {
    return this.otherFacilityService.create(createOtherFacilityDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [CreateOtherFacilityDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.otherFacilityService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateOtherFacilityDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.otherFacilityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: CreateOtherFacilityDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateOtherFacilityDto: CreateOtherFacilityDto,
  ) {
    return this.otherFacilityService.update(+id, updateOtherFacilityDto);
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
    return this.otherFacilityService.remove(+id);
  }
}
