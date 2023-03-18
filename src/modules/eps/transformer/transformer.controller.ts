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
import { TransformerService } from './transformer.service';
import { CreateTransformerDto } from './create-transformer.dto';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
@ApiTags('EPS')
@Controller('api/v1/transformer')
export class TransformerController {
  constructor(private readonly transformerService: TransformerService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createTransformerDto: CreateTransformerDto) {
    return this.transformerService.create(createTransformerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findAll() {
    return this.transformerService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the transformer to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  findOne(@Param('id') id: string) {
    return this.transformerService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the transformer to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateTransformerDto: CreateTransformerDto,
  ) {
    return this.transformerService.update(+id, updateTransformerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the transformer to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.transformerService.remove(+id);
  }
}
