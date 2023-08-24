import { Body, Controller, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('v1/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Send vacation email' })
  @ApiResponse({ status: 200, description: 'Email sent' })
  @ApiParam({ name: 'id', type: Number })
  @Post('vacation-emails/:id')
  sendVacationEmail(@Param('id') id: number) {
    return this.notificationService.vacationEmail(id);
  }

  @ApiOperation({ summary: 'Send payment email' })
  @ApiResponse({ status: 200, description: 'Email sent' })
  @ApiParam({ name: 'id', type: Number })
  @Post('payment-emails/:id')
  sendPaymentEmail(@Param('id') id: number) {
    return this.notificationService.paymentEmail(id);
  }

  @ApiOperation({ summary: 'Send invoice email' })
  @ApiResponse({ status: 200, description: 'Email sent' })
  @ApiParam({ name: 'id', type: Number })
  @Post('invoice-emails/:id')
  sendInvoiceEmail(@Param('id') id: number) {
    return this.notificationService.invoiceEmail(id);
  }
}
