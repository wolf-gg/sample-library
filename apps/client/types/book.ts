export interface BookDto {
  id: string
  title: string
  author: string
}

export interface FindAllBooksResponse {
  count: number
  books: BookDto[]
}
