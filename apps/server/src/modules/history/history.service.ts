import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AdminCheckoutRecordDto,
  CheckoutRecordDto,
  UpdateRecordDto,
} from 'common/dto/history';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { Book } from '../book/book.schema';
import { User } from '../user/user.schema';
import { CheckoutRecord } from './history.schema';

@Injectable()
export class CheckoutRecordService {
  constructor(
    @InjectModel(CheckoutRecord.name)
    private checkoutRecordRepository: Model<CheckoutRecord>,
  ) {}

  private toDto(record: HydratedDocument<CheckoutRecord>) {
    const book = record.book as Book | null;

    return {
      id: record.id,
      bookTitle: book?.title,
      borrowedAt: record.borrowedAt.toISOString(),
      returnedAt: record.returnedAt?.toISOString(),
      returned: record.returned,
    };
  }

  private toAdminDto(record: HydratedDocument<CheckoutRecord>) {
    const book = record.book as Book | null;
    const borrowedBy = record.borrowedBy as User;

    return {
      id: record.id,
      bookTitle: book?.title,
      borrowerName: `${borrowedBy.firstName} ${borrowedBy.lastName}`,
      borrowedAt: record.borrowedAt.toISOString(),
      returnedAt: record.returnedAt?.toISOString(),
      returned: record.returned,
    };
  }

  async findAllForAdmin(): Promise<AdminCheckoutRecordDto[]> {
    const checkoutRecordsForAdmin = await this.checkoutRecordRepository
      .find()
      .sort({
        borrowedAt: 'desc',
      })
      .populate(['book', 'borrowedBy']);

    return checkoutRecordsForAdmin.map((record) => this.toAdminDto(record));
  }

  async findAllByUser(userId: string): Promise<CheckoutRecordDto[]> {
    const checkoutRecordsByUser = await this.checkoutRecordRepository
      .find({
        borrowedBy: new mongoose.Types.ObjectId(userId),
      })
      .sort({
        borrowedAt: 'desc',
      })
      .populate('book');

    return checkoutRecordsByUser.map((record) => this.toDto(record));
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

  async update(id: string, record: UpdateRecordDto) {
    const updatedRecord = await this.checkoutRecordRepository.findByIdAndUpdate(
      id,
      {
        ...record,
      },
    );

    if (updatedRecord === null) {
      throw new NotFoundException('Checkout record not found');
    }

    return this.toDto(updatedRecord);
  }
}
