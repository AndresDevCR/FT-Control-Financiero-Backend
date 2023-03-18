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
import { ImpactService } from './impact.service';
import { CreateImpactDto } from './create-impact.dto';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/impact')
@ApiTags('EPS')
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'Impact created' })
  create(@Body() createImpactDto: CreateImpactDto) {
    return this.impactService.create(createImpactDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Impact list' })
  findAll() {
    return this.impactService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Impact found' })
  findOne(@Param('id') id: string) {
    return this.impactService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Impact updated' })
  update(@Param('id') id: string, @Body() updateImpactDto: CreateImpactDto) {
    return this.impactService.update(+id, updateImpactDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Impact deleted' })
  remove(@Param('id') id: string) {
    return this.impactService.remove(+id);
  }
}
