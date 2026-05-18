"use client"

"use client"

import { Button } from "client/libs/shadcn/button"
import { BookStatus } from "common/dto/book"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const BorrowBookButton: React.FC<{
  id: string
  status: BookStatus
}> = ({ id, status }) => {
  const borrowMutation = useSWRMutation(
    "borrow-book",
    async (_, { arg }: { arg: string }) => {
      const response = await fetch(
        `http://localhost:3001/books/${arg}/borrow`,
        {
          method: "POST",
        }
      )
      return response.json()
    }
  )

  return (
    <Button
      disabled={status === BookStatus.CHECKED_OUT || borrowMutation.isMutating}
      onClick={() => {
        borrowMutation.trigger(id, {
          onSuccess: () => {
            mutate("fetch-all-books")
          },
        })
      }}
    >
      {status === BookStatus.AVAILABLE ? "Borrow" : "Checked out"}
    </Button>
  )
}
