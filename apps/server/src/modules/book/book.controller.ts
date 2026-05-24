import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type {
  BookDto,
  BorrowBookDto,
  CreateBookDto,
  FindAllBooksResponse,
  UpdateBookDto,
} from 'common/dto/book';
import { BookService } from './book.service';

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

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
  ): Promise<BookDto> {
    return this.bookService.updateOne(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.bookService.deleteOne(id);
  }

  @Post(':id/borrow')
  async borrow(@Param('id') id: string, @Body() dto: BorrowBookDto) {
    return this.bookService.borrow(id, dto.borrowedBy);
  }

  @Post(':id/return')
  async return(@Param('id') id: string) {
    return this.bookService.return(id);
  }

  @Post()
  async create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }
}
