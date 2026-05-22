import { Body, Controller, Post } from '@nestjs/common';
import type { CreatePaymentDto } from 'common/dto/payment';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async payOverdueBook(@Body() dto: CreatePaymentDto) {
    return this.paymentService.payOverdueBook(
      dto.amount,
      dto.userId,
      dto.bookId,
    );
  }
}
