import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;
}

export type BookType = HydratedDocument<Book>;
export const BookSchema = SchemaFactory.createForClass(Book);
