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
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Position')
@ApiBearerAuth()
@Controller('position')
@UseGuards(AuthGuard('jwt'))
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @ApiBody({ type: CreatePositionDto })
  @ApiResponse({ status: 201, type: CreatePositionDto })
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [CreatePositionDto] })
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CreatePositionDto })
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdatePositionDto })
  @ApiResponse({ status: 200, type: UpdatePositionDto })
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
