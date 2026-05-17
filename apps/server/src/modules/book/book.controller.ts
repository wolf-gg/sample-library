import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import type { BookDto, CreateBookDto, FindAllBooksResponse } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async findAll(): Promise<FindAllBooksResponse> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookDto> {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.bookService.deleteOne(id);

    return 'Successfully deleted book';
  }

  @Post()
  async create(@Body() book: CreateBookDto) {
    await this.bookService.create(book);

    return 'Successfully created new book';
  }
}
