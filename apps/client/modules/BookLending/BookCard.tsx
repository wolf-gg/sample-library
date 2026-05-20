import { BookDto, BookStatus } from "common/dto/book"
import { BorrowBookButton } from "./BorrowBookButton"
import { ReturnBookButton } from "./ReturnBookButton"
import { BookStatusLabel } from "./BookStatusLabel"
import { UserDto } from "common/dto/user"

const formatBorrowedAt = (status: BookStatus, borrowedAt?: string) => {
  if (!borrowedAt || status === BookStatus.AVAILABLE) {
    return "—"
  }

  return new Date(borrowedAt).toLocaleString()
}

const getBorrowedBy = (user?: UserDto) => {
  if (user === undefined) {
    return "—"
  }
  return `${user.firstName} ${user.lastName}`
}

export const BookCard: React.FC<{ book: BookDto }> = ({ book }) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-2 border-muted-foreground p-5">
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-bold">{book.title}</h2>
          <h3 className="text-sm text-muted-foreground">{book.author}</h3>
        </div>
        <div className="space-y-1 text-sm">
          <BookStatusLabel book={book} />
          <p>
            <span className="font-semibold">Checked out:</span>{" "}
            {formatBorrowedAt(book.status, book.borrowedAt)}
          </p>
          <p>
            <span className="font-semibold">Borrowed by:</span>{" "}
            {getBorrowedBy(book.borrowedBy)}
          </p>
        </div>
      </div>
      <div className="mt-4">
        {book.status !== BookStatus.AVAILABLE ? (
          <ReturnBookButton id={book.id} status={book.status} />
        ) : (
          <BorrowBookButton id={book.id} status={book.status} />
        )}
      </div>
    </div>
  )
}
