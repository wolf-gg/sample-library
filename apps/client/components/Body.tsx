import { BookGrid } from "client/modules/book/BookGrid."
import { BookDto } from "client/types"
import useSWR from "swr"

export const Body: React.FC = () => {
  const { data } = useSWR<{ count: number; books: BookDto[] }>(
    "books",
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
        <p>{`${data.count} books in library`}</p>
        <BookGrid books={data.books} />
      </div>
    </div>
  )
}
