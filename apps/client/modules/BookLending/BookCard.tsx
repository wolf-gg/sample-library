import { BookDto, BookStatus } from "common/dto/book"
import { BorrowBookButton } from "./BorrowBookButton"

const formatBorrowedAt = (borrowedAt?: string) => {
  if (!borrowedAt) {
    return "—"
  }

  return new Date(borrowedAt).toLocaleDateString()
}

export const BookCard: React.FC<{ book: BookDto }> = ({ book }) => (
  <div className="flex h-full flex-col justify-between rounded-lg border border-2 border-muted-foreground p-5">
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold">{book.title}</h2>
        <h3 className="text-sm text-muted-foreground">{book.author}</h3>
      </div>
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-medium ${
              book.status === BookStatus.AVAILABLE
                ? "text-emerald-600"
                : "text-rose-600"
            }`}
          >
            {book.status === BookStatus.AVAILABLE ? "Available" : "Checked out"}
          </span>
        </p>
        <p>
          <span className="font-semibold">Checked out:</span>{" "}
          {formatBorrowedAt(book.borrowedAt)}
        </p>
      </div>
    </div>
    <div className="mt-4">
      <BorrowBookButton id={book.id} status={book.status} />
    </div>
  </div>
)
