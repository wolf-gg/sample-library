import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminHistoryController } from './admin.history.controller';
import { HistoryController } from './history.controller';
import { CheckoutRecord, CheckoutRecordSchema } from './history.schema';
import { CheckoutRecordService } from './history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CheckoutRecord.name,
        schema: CheckoutRecordSchema,
      },
    ]),
  ],
  controllers: [HistoryController, AdminHistoryController],
  providers: [CheckoutRecordService],
  exports: [CheckoutRecordService],
})
export class CheckoutRecordModule {}
