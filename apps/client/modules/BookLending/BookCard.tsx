import { useLoginStore } from "client/stores/login"
import { BookDto, BookStatus } from "common/dto/book"
import { UserDto } from "common/dto/user"
import { BookStatusLabel } from "./BookStatusLabel"
import { BorrowBookButton } from "./BorrowBookButton"
import { ReturnBookButton } from "./ReturnBookButton"

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

const ActionButton: React.FC<{
  id: string
  status: BookStatus
  borrowedBy?: UserDto
}> = ({ id, status, borrowedBy }) => {
  if (status === BookStatus.AVAILABLE) {
    return <BorrowBookButton id={id} />
  }

  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)
  const loggedInUser = useLoginStore((state) => state.loggedInUser)

  const isDifferentUserLoggedIn = () => {
    if (
      loggedInUser === undefined ||
      isLoggedIn === undefined ||
      borrowedBy === undefined
    ) {
      return false
    }

    if (isLoggedIn === true && loggedInUser.id !== borrowedBy.id) {
      return true
    }
  }

  if (isDifferentUserLoggedIn() || isLoggedIn === false) {
    return <></>
  }

  return <ReturnBookButton id={id} />
}

export const BookCard: React.FC<{ book: BookDto }> = ({ book }) => {
  return (
    <div className="flex h-full flex-col justify-between gap-4 rounded-lg border border-2 border-muted-foreground p-5">
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
      <div className="flex flex-row justify-end">
        <ActionButton
          id={book.id}
          status={book.status}
          borrowedBy={book.borrowedBy}
        />
      </div>
    </div>
  )
}
