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

const OVERDUE_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;

const getComputedStatus = (
  status: BookStatus,
  borrowedAt?: Date,
): BookStatus => {
  if (status === BookStatus.CHECKED_OUT && borrowedAt) {
    const elapsedMs = Date.now() - borrowedAt.getTime();
    if (elapsedMs > OVERDUE_THRESHOLD_MS) {
      return BookStatus.OVERDUE;
    }
  }

  return status;
};

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookRepository: Model<Book>) {}

  async findAll(): Promise<FindAllBooksResponse> {
    const allBooks = await this.bookRepository.find().populate('borrowedBy');

    return {
      count: allBooks.length,
      books: allBooks.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        status: getComputedStatus(book.status, book.borrowedAt),
        borrowedAt: book.borrowedAt?.toISOString(),
        borrowedBy: book.borrowedBy as unknown as UserDto,
      })),
    };
  }

  async findOne(id: string): Promise<BookDto> {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    }

    return {
      id: book.id,
      title: book.title,
      author: book.author,
      status: getComputedStatus(book.status, book.borrowedAt),
      borrowedAt: book.borrowedAt?.toISOString(),
    };
  }

  async create(book: CreateBookDto) {
    const newBook = await this.bookRepository.create(book);

    return {
      id: newBook.id,
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
