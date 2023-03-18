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
import { ThreadService } from './thread.service';
import { CreateThreadDto } from './create-thread.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('EPS')
@Controller('api/v1/thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadService.create(createThreadDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findAll() {
    return this.threadService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the thread to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.threadService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the thread to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateThreadDto: CreateThreadDto) {
    return this.threadService.update(+id, updateThreadDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the thread to delete',
  })
  remove(@Param('id') id: string) {
    return this.threadService.remove(+id);
  }
}
