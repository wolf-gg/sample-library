import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './modules/book/book.controller';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.101.129:27017', {
      dbName: 'library',
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
