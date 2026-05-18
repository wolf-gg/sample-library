import { BookDto } from "client/types"
import useSWR from "swr"
import { AddBookDialog } from "./AddBookDialog"
import { BookGrid } from "./BookGrid."

export const BookManagement: React.FC = () => {
  const { data } = useSWR<{ count: number; books: BookDto[] }>(
    "fetch-all-books",
    async () => {
      const response = await fetch("http://localhost:3001/books")
      return response.json()
    }
  )

  if (data === undefined) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <AddBookDialog />
        <p>{`${data.count} books`}</p>
      </div>
      <BookGrid books={data.books} />
    </div>
  )
}
