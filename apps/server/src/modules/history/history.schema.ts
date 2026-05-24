import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../book/book.schema';
import { User } from '../user/user.schema';

@Schema()
export class CheckoutRecord {
  @Prop({ required: true, default: false })
  returned: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: mongoose.Types.ObjectId | Book;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  borrowedBy: mongoose.Types.ObjectId | User;

  @Prop({ required: true })
  borrowedAt: Date;

  @Prop({ required: false })
  returnedAt?: Date;
}

export const CheckoutRecordSchema =
  SchemaFactory.createForClass(CheckoutRecord);
