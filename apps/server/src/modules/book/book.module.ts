import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutRecordModule } from '../history/history.module';
import { BookController } from './book.controller';
import { Book, BookSchema } from './book.schema';
import { BookService } from './book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    CheckoutRecordModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
