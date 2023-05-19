import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './create-inventory.dto';
import { ApiTags, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@Controller('inventory')
@ApiTags('Inventory')
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateInventoryDto,
  })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: CreateInventoryDto,
  })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the inventory to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: CreateInventoryDto,
  })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the inventory to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreateInventoryDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: CreateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the inventory to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: CreateInventoryDto,
  })
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
