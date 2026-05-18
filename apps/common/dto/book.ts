export interface BookDto {
  id: string;
  title: string;
  author: string;
}

export interface CreateBookDto extends BookDto {}

export interface FindAllBooksResponse {
  count: number;
  books: BookDto[];
}
