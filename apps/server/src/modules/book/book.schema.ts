import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { BookStatus } from 'common/dto/book';
import mongoose from 'mongoose';

enum BaseStatus {
  AVAILABLE = 'AVAILABLE',
  CHECKED_OUT = 'CHECKED_OUT',
}

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Virtual({
    get: function (this: Book) {
      const OVERDUE_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;

      if (this.borrowedAt === undefined) {
        return BookStatus.AVAILABLE;
      }

      const elapsedMs = Date.now() - this.borrowedAt.getTime();

      if (elapsedMs > OVERDUE_THRESHOLD_MS) {
        return BookStatus.OVERDUE;
      } else {
        return BookStatus.CHECKED_OUT;
      }
    },
  })
  status: BookStatus;

  @Prop({
    required: true,
    type: String,
    enum: BaseStatus,
    default: BaseStatus.AVAILABLE,
    select: false,
  })
  baseStatus: BaseStatus;

  @Prop({ required: false })
  borrowedAt?: Date;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  borrowedBy?: mongoose.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
