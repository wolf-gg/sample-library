import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.101.129:27017/library'),
    BookModule,
    UserModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
