import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import type {
  AdminCheckoutRecordDto,
  UpdateRecordDto,
} from 'common/dto/history';
import { CheckoutRecordService } from './history.service';

@Controller('admin/history')
export class AdminHistoryController {
  constructor(private checkoutRecordService: CheckoutRecordService) {}

  @Get()
  async findAllForAdmin(): Promise<AdminCheckoutRecordDto[]> {
    return this.checkoutRecordService.findAllForAdmin();
  }

  @Patch(':id')
  async updateCheckoutRecord(
    @Param('id') id: string,
    @Body() dto: UpdateRecordDto,
  ) {
    return this.checkoutRecordService.update(id, dto);
  }
}
