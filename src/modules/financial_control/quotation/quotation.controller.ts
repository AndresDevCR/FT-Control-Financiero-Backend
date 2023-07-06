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
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quotation')
@ApiBearerAuth()
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  @ApiBody({ type: CreateQuotationDto })
  @ApiResponse({ status: 201, type: CreateQuotationDto })
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [CreateQuotationDto] })
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: CreateQuotationDto })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateQuotationDto })
  @ApiResponse({ status: 200, type: UpdateQuotationDto })
  update(
    @Param('id') id: string,
    @Body() updateQuotationDto: UpdateQuotationDto,
  ) {
    return this.quotationService.update(+id, updateQuotationDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: String })
  remove(@Param('id') id: string) {
    return this.quotationService.remove(+id);
  }
}
