import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../book/book.schema';
import { User } from '../user/user.schema';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Payment {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: mongoose.Types.ObjectId | Book;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  paidBy: mongoose.Types.ObjectId | User;

  @Prop({ required: true })
  paidAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
