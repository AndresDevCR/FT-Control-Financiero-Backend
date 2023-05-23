import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { CreateVacationDto } from './create-vacation.dto';

@Controller('vacation')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Post()
  create(@Body() createVacationDto: CreateVacationDto) {
    return this.vacationService.create(createVacationDto);
  }

  @Get()
  findAll() {
    return this.vacationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacationDto: CreateVacationDto) {
    return this.vacationService.update(+id, updateVacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacationService.remove(+id);
  }
}
