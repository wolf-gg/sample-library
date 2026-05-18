"use client"

import { Button } from "client/libs/shadcn/button"
import { BookStatus } from "common/dto/book"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const ReturnBookButton: React.FC<{
  id: string
  status: BookStatus
}> = ({ id, status }) => {
  const returnBook = useSWRMutation(
    "return-book",
    async (_, { arg }: { arg: string }) => {
      const response = await fetch(
        `http://localhost:3001/books/${arg}/return`,
        {
          method: "POST",
        }
      )
      return response.json()
    }
  )

  return (
    <Button
      disabled={status === BookStatus.AVAILABLE || returnBook.isMutating}
      onClick={() => {
        returnBook.trigger(id, {
          onSuccess: () => {
            mutate("fetch-all-books")
          },
        })
      }}
    >
      Return
    </Button>
  )
}
