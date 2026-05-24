import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CheckoutRecordDto } from 'common/dto/history';
import mongoose, { Model } from 'mongoose';
import { Book } from '../book/book.schema';
import { CheckoutRecord } from './history.schema';

@Injectable()
export class CheckoutRecordService {
  constructor(
    @InjectModel(CheckoutRecord.name)
    private checkoutRecordRepository: Model<CheckoutRecord>,
  ) {}

  async findAllByUser(userId: string): Promise<CheckoutRecordDto[]> {
    const checkoutRecordsByUser = await this.checkoutRecordRepository
      .find({
        borrowedBy: new mongoose.Types.ObjectId(userId),
      })
      .sort({
        borrowedAt: 'desc',
      })
      .populate('book');

    return checkoutRecordsByUser.map((record) => {
      const book = record.book as Book;

      return {
        id: record.id,
        bookTitle: book.title,
        borrowedAt: record.borrowedAt.toISOString(),
        returnedAt: record.returnedAt?.toISOString(),
        returned: record.returned,
      };
    });
  }

  async create(userId: string, bookId: string): Promise<string> {
    const newCheckoutRecord = await this.checkoutRecordRepository.create({
      borrowedBy: new mongoose.Types.ObjectId(userId),
      borrowedAt: new Date(),
      book: new mongoose.Types.ObjectId(bookId),
    });

    return newCheckoutRecord.id;
  }

  async recordReturn(id: string) {
    const checkoutRecord = await this.checkoutRecordRepository.findById(id);

    if (checkoutRecord === null) {
      throw new BadRequestException('Checkout record not found');
    }

    checkoutRecord.returnedAt = new Date();
    checkoutRecord.returned = true;
    await checkoutRecord.save();
  }
}
