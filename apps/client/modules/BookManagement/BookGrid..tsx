import { BookDto } from "client/types"
import { BookCard } from "./BookCard"

export const BookGrid: React.FC<{ books: BookDto[] }> = ({ books }) => (
  <div className="grid grid-cols-3 gap-4">
    {books.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
)
