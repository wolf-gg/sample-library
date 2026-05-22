import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Payment {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  paidBy: mongoose.Types.ObjectId;

  @Prop({ required: true })
  paidAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
