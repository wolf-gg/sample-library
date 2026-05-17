import { AddBookDialog } from "client/modules/book/AddBookDialog"
import { BookGrid } from "client/modules/book/BookGrid."
import { BookDto } from "client/types"
import useSWR from "swr"

export const Body: React.FC = () => {
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
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="align-center flex flex-row justify-between">
          <AddBookDialog />
          <p>{`${data.count} books`}</p>
        </div>
        <BookGrid books={data.books} />
      </div>
    </div>
  )
}
