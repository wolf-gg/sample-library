import { BookDto, BookStatus } from "common/dto/book"

const getOverdueDays = (borrowedAt?: string) => {
  if (!borrowedAt) {
    return 0
  }

  const msPerDay = 1000 * 60 * 60 * 24
  const elapsedDays = Math.floor(
    (Date.now() - new Date(borrowedAt).getTime()) / msPerDay
  )

  return Math.max(0, elapsedDays - 7)
}

export const BookStatusLabel: React.FC<{ book: BookDto }> = ({ book }) => {
  const getStatusColor = () => {
    if (book.status === BookStatus.AVAILABLE) {
      return "text-emerald-600"
    } else if (book.status === BookStatus.OVERDUE) {
      return "text-rose-600"
    } else if (book.status === BookStatus.CHECKED_OUT) {
      return "text-amber-600"
    }
  }

  const getStatusText = () => {
    if (book.status === BookStatus.AVAILABLE) {
      return "Available"
    } else if (book.status === BookStatus.OVERDUE) {
      const overdueDays = getOverdueDays(book.borrowedAt)
      return `Overdue${overdueDays > 0 ? ` (${overdueDays} day${overdueDays > 1 ? "s" : ""})` : ""}`
    } else if (book.status === BookStatus.CHECKED_OUT) {
      return "Checked out"
    }
  }

  return (
    <p>
      <span className="font-semibold">Status:</span>{" "}
      <span className={`font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    </p>
  )
}
