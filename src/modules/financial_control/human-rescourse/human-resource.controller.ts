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
import { HumanRescourseService } from './human-rescourse.service';
import { CreateHumanRescourseDto } from './create-human-resource.dto';
import {
  ApiTags,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('human-rescourse')
@ApiTags('Human Rescourse')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class HumanRescourseController {
  constructor(private readonly humanRescourseService: HumanRescourseService) {}

  @Post()
  @ApiBody({ type: CreateHumanRescourseDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateHumanRescourseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  create(@Body() createHumanRescourseDto: CreateHumanRescourseDto) {
    return this.humanRescourseService.create(createHumanRescourseDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all human rescourses',
    type: CreateHumanRescourseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll() {
    return this.humanRescourseService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Return a human rescourse',
    type: CreateHumanRescourseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findOne(@Param('id') id: string) {
    return this.humanRescourseService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CreateHumanRescourseDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreateHumanRescourseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  update(
    @Param('id') id: string,
    @Body() updateHumanRescourseDto: CreateHumanRescourseDto,
  ) {
    return this.humanRescourseService.update(+id, updateHumanRescourseDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: CreateHumanRescourseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  remove(@Param('id') id: string) {
    return this.humanRescourseService.remove(+id);
  }
}
