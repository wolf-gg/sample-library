import { Controller, Get, Param } from '@nestjs/common';
import { CheckoutRecordDto } from 'common/dto/history';
import { CheckoutRecordService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private checkoutRecordService: CheckoutRecordService) {}

  @Get(':userId')
  async findAllByUser(
    @Param('userId') userId: string,
  ): Promise<CheckoutRecordDto[]> {
    return this.checkoutRecordService.findAllByUser(userId);
  }
}
