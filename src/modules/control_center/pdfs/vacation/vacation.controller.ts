import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { VacationService } from './vacation.service';
@Controller()
export class VacationController {
  constructor(private readonly appService: VacationService) {}

  @Get('/v1/pdf/download/vacation/:id')
  @ApiTags('PDF')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  async downloadPDF(@Param('id') id: number, @Res() res: any): Promise<void> {
    const buffer = await this.appService.generarPDF(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename=Vacation-Control-Financiero.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
