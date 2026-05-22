"use client"

import { LoadingScreen } from "client/components/LoadingScreen"
import { BookStatus, FindAllBooksResponse } from "common/dto/book"
import useSWR from "swr"
import { BookGrid } from "./BookGrid"

export const BookLending: React.FC = () => {
  const { data } = useSWR<FindAllBooksResponse>("fetch-all-books", async () => {
    const response = await fetch("http://localhost:3001/books")
    return response.json()
  })

  if (data === undefined) {
    return <LoadingScreen message="Loading books..." />
  }

  const availableBooks = data.books.filter(
    (book) => book.status === BookStatus.AVAILABLE
  )

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Borrow Books</h2>
          <p className="text-sm text-muted-foreground">
            {`${data.count} books total · ${availableBooks.length} available`}
          </p>
        </div>
      </div>
      <BookGrid books={data.books} />
    </div>
  )
}
