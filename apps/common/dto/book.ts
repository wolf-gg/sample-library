import { UserDto } from "./user";

export interface BookDto {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  borrowedAt?: string;
  borrowedBy?: UserDto;
}

export interface CreateBookDto {
  title: string;
  author: string;
}

export interface UpdateBookDto {
  title: string;
  author: string;
}

export interface BorrowBookDto {
  borrowedBy: string;
}

export interface FindAllBooksResponse {
  count: number;
  books: BookDto[];
}

export enum BookStatus {
  AVAILABLE = "AVAILABLE",
  CHECKED_OUT = "CHECKED_OUT",
  OVERDUE = "OVERDUE",
}
