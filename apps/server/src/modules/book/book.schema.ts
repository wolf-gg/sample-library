import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CheckoutRecord } from '../history/history.schema';

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckoutRecord',
  })
  checkoutRecord?: mongoose.Types.ObjectId | CheckoutRecord;
}

export const BookSchema = SchemaFactory.createForClass(Book);
