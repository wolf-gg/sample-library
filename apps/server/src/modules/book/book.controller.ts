import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BookController {
  @Get()
  findAll(): string {
    return 'Return all books';
  }

  @Get()
  findOne(): string {
    return 'Return one book';
  }
}
