import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BookDto,
  BookStatus,
  CreateBookDto,
  FindAllBooksResponse,
} from 'common/dto/book';
import { UserDto } from 'common/dto/user';
import mongoose, { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookRepository: Model<Book>) {}

  async findAll(): Promise<FindAllBooksResponse> {
    const allBooksQuery = await this.bookRepository
      .find()
      .populate('borrowedBy');

    const allBooks = allBooksQuery.map((book) => book.toJSON());

    return {
      count: allBooks.length,
      books: allBooks.map((book) => ({
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        status: book.status,
        borrowedAt: book.borrowedAt?.toISOString(),
        // This is a quick, but not ideal workaround to convert the
        // populated document type into `UserDto`.
        borrowedBy: book.borrowedBy as unknown as UserDto,
      })),
    };
  }

  async findOne(id: string): Promise<BookDto> {
    const bookQuery = await this.bookRepository.findById(id);
    const book = bookQuery?.toJSON();

    if (book === undefined) {
      throw new NotFoundException('Book not found');
    }

    return {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      status: book.status,
      borrowedAt: book.borrowedAt?.toISOString(),
    };
  }

  async create(book: CreateBookDto) {
    const newBookQuery = await this.bookRepository.create(book);
    const newBook = newBookQuery.toJSON();

    return {
      id: newBook._id.toString(),
      author: newBook.author,
      title: newBook.title,
      status: newBook.status,
      borrowedAt: newBook.borrowedAt?.toISOString(),
    };
  }

  async deleteOne(id: string) {
    const deletedBook = await this.bookRepository.findOneAndDelete({ _id: id });

    if (deletedBook === null) {
      throw new NotFoundException('Book not found');
    }

    return deletedBook._id.toString();
  }

  async borrow(id: string, userId: string) {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    } else if (book.status !== BookStatus.AVAILABLE) {
      throw new BadRequestException('Book is already checked out');
    }

    book.status = BookStatus.CHECKED_OUT;
    book.borrowedAt = new Date();
    book.borrowedBy = new mongoose.Types.ObjectId(userId);
    await book.save();

    return { id: book.id, title: book.title, author: book.author };
  }

  async return(id: string) {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    }

    if (book.status === 'AVAILABLE') {
      throw new BadRequestException('Book is not checked out');
    }

    book.status = BookStatus.AVAILABLE;
    book.borrowedAt = undefined;
    book.borrowedBy = undefined;
    await book.save();

    return { id: book.id, title: book.title, author: book.author };
  }
}
