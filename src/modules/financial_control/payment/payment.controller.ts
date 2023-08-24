import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create a new payment record' })
  @ApiResponse({
    status: 201,
    description: 'The payment record has been created successfully',
    type: Payment,
  })
  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all payment records' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all payment records successfully',
    type: [Payment],
  })
  @Get()
  findAllPayments(): Promise<Payment[]> {
    return this.paymentService.findAllPayments();
  }

  @ApiOperation({ summary: 'Get a payment record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved the payment record successfully',
    type: Payment,
  })
  @ApiResponse({ status: 404, description: 'Payment record not found' })
  @Get(':id')
  findOnePayment(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findOnePayment(id);
  }

  @ApiOperation({ summary: 'Update a payment record' })
  @ApiResponse({
    status: 200,
    description: 'Updated the payment record successfully',
    type: Payment,
  })
  @ApiResponse({ status: 404, description: 'Payment record not found' })
  @Patch(':id')
  updatePayment(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete a payment record' })
  @ApiResponse({
    status: 200,
    description: 'Deleted the payment record successfully',
    type: Payment,
  })
  @ApiResponse({ status: 404, description: 'Payment record not found' })
  @Delete(':id')
  deletePayment(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.deletePayment(id);
  }
}
