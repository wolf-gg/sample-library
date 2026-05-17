import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookType } from './book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookRepository: Model<Book>) {}

  async create(book: CreateBookDto) {
    const newBook = await this.bookRepository.create(book);

    return newBook;
  }
}
