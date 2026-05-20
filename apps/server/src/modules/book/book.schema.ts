import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookStatus } from 'common/dto/book';
import mongoose from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({
    required: true,
    type: String,
    enum: BookStatus,
    default: BookStatus.AVAILABLE,
  })
  status: BookStatus;

  @Prop({ required: false })
  borrowedAt?: Date;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  borrowedBy?: mongoose.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
