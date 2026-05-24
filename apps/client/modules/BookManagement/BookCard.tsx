import { BookDto } from "common/dto/book"
import { RemoveBookButton } from "./RemoveBookButton"
import { UpdateBookButton } from "./UpdateBookButton"

export const BookCard: React.FC<{ book: BookDto }> = ({ book }) => (
  <div className="flex flex-row items-center justify-between rounded-lg border border-2 border-muted-foreground p-4">
    <div className="flex flex-col">
      <h2 className="text-md font-bold">{book.title}</h2>
      <h3 className="text-sm text-muted-foreground">{book.author}</h3>
    </div>
    <div className="flex items-center gap-2">
      <UpdateBookButton book={book} />
      <RemoveBookButton id={book.id} title={book.title} />
    </div>
  </div>
)
