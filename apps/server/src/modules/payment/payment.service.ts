import { InjectModel } from '@nestjs/mongoose';
import { BookDto } from 'common/dto/book';
import { PaymentDto } from 'common/dto/payment';
import { UserDto } from 'common/dto/user';
import mongoose, { Model } from 'mongoose';
import { Payment } from './payment.schema';

export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentRepository: Model<Payment>,
  ) {}

  async payOverdueBook(
    amount: number,
    userId: string,
    bookId: string,
  ): Promise<PaymentDto> {
    const newPaymentQuery = await this.paymentRepository.create({
      amount,
      book: new mongoose.Types.ObjectId(bookId),
      paidBy: new mongoose.Types.ObjectId(userId),
      paidAt: new Date(),
    });
    const newPayment = newPaymentQuery.toJSON();

    return {
      id: newPayment._id.toString(),
      amount: newPayment.amount,
      // This is a quick, but not ideal workaround to convert the
      // populated document type into `Dto`.
      book: newPayment.book as unknown as BookDto,
      paidBy: newPayment.paidBy as unknown as UserDto,
      paidAt: newPayment.paidAt.toISOString(),
    };
  }

  async findAllPaymentsByUser(userId: string): Promise<PaymentDto[]> {
    const paymentsQuery = await this.paymentRepository
      .find({
        paidBy: userId,
      })
      .populate(['book', 'paidBy']);
    const payments = paymentsQuery.map((paymentQuery) => paymentQuery.toJSON());

    return payments.map((payment) => ({
      id: payment._id.toString(),
      amount: payment.amount,
      // This is a quick, but not ideal workaround to convert the
      // populated document type into `Dto`.
      book: payment.book as unknown as BookDto,
      paidBy: payment.paidBy as unknown as UserDto,
      paidAt: payment.paidAt.toISOString(),
    }));
  }
}
