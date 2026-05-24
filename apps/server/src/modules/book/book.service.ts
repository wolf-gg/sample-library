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
import { getIsOverdue } from 'common/utils/book';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { CheckoutRecord } from '../history/history.schema';
import { CheckoutRecordService } from '../history/history.service';
import { User } from '../user/user.schema';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookRepository: Model<Book>,
    private checkoutRecordService: CheckoutRecordService,
  ) {}

  private getBookStatus = (checkoutRecord: CheckoutRecord | undefined) => {
    if (checkoutRecord === undefined) {
      return BookStatus.AVAILABLE;
    }

    if (getIsOverdue(checkoutRecord.borrowedAt)) {
      return BookStatus.OVERDUE;
    } else {
      return BookStatus.CHECKED_OUT;
    }
  };

  private toDto = (book: HydratedDocument<Book>) => {
    const checkoutRecord = book.checkoutRecord as CheckoutRecord | undefined;
    const borrowedBy = checkoutRecord?.borrowedBy as HydratedDocument<User>;

    return {
      id: book.id,
      title: book.title,
      author: book.author,
      status: this.getBookStatus(checkoutRecord),
      borrowedAt: checkoutRecord?.borrowedAt.toISOString(),
      borrowedBy:
        borrowedBy !== undefined
          ? {
              id: borrowedBy._id.toString(),
              firstName: borrowedBy.firstName,
              lastName: borrowedBy.lastName,
              username: borrowedBy.username,
            }
          : undefined,
    };
  };

  async findAll(): Promise<FindAllBooksResponse> {
    const allBooks = await this.bookRepository.find().populate({
      path: 'checkoutRecord',
      populate: {
        path: 'borrowedBy',
        model: 'User',
      },
    });

    return {
      count: allBooks.length,
      books: allBooks.map((book) => this.toDto(book)),
    };
  }

  async findOne(id: string): Promise<BookDto> {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    }

    return this.toDto(book);
  }

  async create(book: CreateBookDto) {
    const newBook = await this.bookRepository.create(book);

    return this.toDto(newBook);
  }

  async deleteOne(id: string) {
    const deletedBook = await this.bookRepository.findOneAndDelete({ _id: id });

    if (deletedBook === null) {
      throw new NotFoundException('Book not found');
    }

    return deletedBook.id;
  }

  async borrow(id: string, userId: string) {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    } else if (book.checkoutRecord !== undefined) {
      throw new BadRequestException('Book is already checked out');
    }

    const checkoutRecordId = await this.checkoutRecordService.create(
      userId,
      book.id,
    );
    book.checkoutRecord = new mongoose.Types.ObjectId(checkoutRecordId);

    await book.save();

    return { id: book.id, title: book.title, author: book.author };
  }

  async return(id: string) {
    const book = await this.bookRepository.findById(id);

    if (book === null) {
      throw new NotFoundException('Book not found');
    }

    if (book.checkoutRecord === undefined) {
      throw new BadRequestException('Book is not checked out');
    }

    await this.checkoutRecordService.recordReturn(
      (book.checkoutRecord as mongoose.Types.ObjectId).toString(),
    );

    book.checkoutRecord = undefined;
    await book.save();

    return { id: book.id, title: book.title, author: book.author };
  }
}
