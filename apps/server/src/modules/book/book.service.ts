import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { BookDto, CreateBookDto, FindAllBooksResponse } from 'common/dto/book';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookRepository: Model<Book>) {}

  async findAll(): Promise<FindAllBooksResponse> {
    const allBooks = await this.bookRepository.find();
    return {
      count: allBooks.length,
      books: allBooks.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
      })),
    };
  }

  async findOne(id: string): Promise<BookDto> {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    }

    return { id: book.id, title: book.title, author: book.author };
  }

  async create(book: CreateBookDto) {
    const newBook = await this.bookRepository.create(book);

    return { id: newBook.id, author: newBook.author, title: newBook.title };
  }

  async deleteOne(id: string) {
    const deletedBook = await this.bookRepository.findOneAndDelete({ _id: id });

    if (deletedBook === null) {
      throw new NotFoundException('Book not found');
    }

    return deletedBook._id.toString();
  }
}
