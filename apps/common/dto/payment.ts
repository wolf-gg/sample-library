import { BookDto } from "./book";
import { UserDto } from "./user";

export interface PaymentDto {
  id: string;
  amount: number;
  book: BookDto;
  paidBy: UserDto;
  paidAt: string;
}

export interface CreatePaymentDto {
  amount: number;
  bookId: string;
  userId: string;
}
