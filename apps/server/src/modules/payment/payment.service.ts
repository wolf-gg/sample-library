import { InjectModel } from '@nestjs/mongoose';
import { PaymentDto } from 'common/dto/payment';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { Book } from '../book/book.schema';
import { User } from '../user/user.schema';
import { Payment } from './payment.schema';

export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentRepository: Model<Payment>,
  ) {}

  private toDto(payment: HydratedDocument<Payment>) {
    const book = payment.book as Book | null;
    const user = payment.paidBy as User;

    return {
      id: payment.id,
      amount: payment.amount,
      bookTitle: book?.title,
      paidBy: `${user.firstName} ${user.lastName}`,
      paidAt: payment.paidAt.toISOString(),
    };
  }

  async payOverdueBook(
    amount: number,
    userId: string,
    bookId: string,
  ): Promise<PaymentDto> {
    const newPayment = await this.paymentRepository.create({
      amount,
      book: new mongoose.Types.ObjectId(bookId),
      paidBy: new mongoose.Types.ObjectId(userId),
      paidAt: new Date(),
    });

    return this.toDto(newPayment);
  }

  async findAllPaymentsByUser(userId: string): Promise<PaymentDto[]> {
    const payments = await this.paymentRepository
      .find({
        paidBy: userId,
      })
      .sort({
        paidAt: 'desc',
      })
      .populate(['book', 'paidBy']);

    return payments.map((payment) => this.toDto(payment));
  }
}
