import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('logs')
@ApiTags('logs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create log' })
  @ApiBody({ type: CreateLogDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Req() req: Request, @Body() createLogDto: CreateLogDto) {
    return this.logsService.createLog(createLogDto, req.user['id']);
  }

  @Get()
  @ApiOperation({ summary: 'Get all logs' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.logsService.findAll();
  }
}
