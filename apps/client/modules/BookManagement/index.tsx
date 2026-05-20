"use client"

import useSWR from "swr"
import { AddBookDialog } from "./AddBookDialog"
import { BookGrid } from "./BookGrid."
import { FindAllBooksResponse } from "common/dto/book"
import { LoadingScreen } from "client/components/LoadingScreen"

export const BookManagement: React.FC = () => {
  const { data } = useSWR<FindAllBooksResponse>("fetch-all-books", async () => {
    const response = await fetch("http://localhost:3001/books")
    return response.json()
  })

  if (data === undefined) {
    return <LoadingScreen message="Loading books..." />
  }

  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Manage Books</h2>
          <p className="text-sm text-muted-foreground">
            {`${data.count} books total`}
          </p>
        </div>
        <AddBookDialog />
      </div>
      <BookGrid books={data.books} />
    </div>
  )
}
