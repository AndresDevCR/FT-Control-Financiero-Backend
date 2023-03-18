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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './create-ticket.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Ticket System')
@Controller('api/v1/ticket')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateTicketDto,
  })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: CreateTicketDto,
  })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the ticket to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
    type: CreateTicketDto,
  })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the ticket to update',
  })
  update(@Param('id') id: string, @Body() updateTicketDto: CreateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The id of the ticket to delete',
  })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
