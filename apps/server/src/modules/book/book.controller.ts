import { Controller, Get, Post } from '@nestjs/common';
import { BookType } from './book.schema';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  findAll() {
    return 'Return all books';
  }

  @Get()
  findOne() {
    return 'Return one book';
  }

  @Post()
  async create() {
    await this.bookService.create({ title: 'test', author: 'test author' });

    return 'Successfully created new book';
  }
}
