import { BookDto } from "./book";
import { UserDto } from "./user";

export interface PaymentDto {
  id: string;
  amount: number;
  bookTitle?: string;
  paidBy: string;
  paidAt: string;
}

export interface CreatePaymentDto {
  amount: number;
  bookId: string;
  userId: string;
}
