export interface BookDto {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  borrowedAt?: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
}

export interface FindAllBooksResponse {
  count: number;
  books: BookDto[];
}

export enum BookStatus {
  AVAILABLE = "AVAILABLE",
  CHECKED_OUT = "CHECKED_OUT",
}
