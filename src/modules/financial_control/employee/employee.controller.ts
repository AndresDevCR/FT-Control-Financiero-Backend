import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Request } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Employee')
@ApiBearerAuth()
@Controller('employee') // Change the base path to 'employees'
@UseGuards(AuthGuard('jwt'))
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, type: CreateEmployeeDto })
  async create(
    @Req() req: Request,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeeService.create(createEmployeeDto, req.user['id']);
  }

  @Get()
  @ApiResponse({ status: 200, type: [CreateEmployeeDto] })
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number }) // Change the type to Number
  @ApiResponse({ status: 200, type: CreateEmployeeDto })
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number }) // Change the type to Number
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, type: UpdateEmployeeDto })
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number }) // Change the type to Number
  @ApiResponse({ status: 200, type: UpdateEmployeeDto })
  remove(@Param('id') id: number) {
    return this.employeeService.remove(id);
  }
}
