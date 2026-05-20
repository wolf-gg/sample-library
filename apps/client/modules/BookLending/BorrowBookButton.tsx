"use client"

"use client"

import { Button } from "client/libs/shadcn/button"
import { useLoginStore } from "client/stores/login"
import { BookStatus } from "common/dto/book"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import { is } from "zod/locales"

export const BorrowBookButton: React.FC<{
  id: string
  status: BookStatus
}> = ({ id, status }) => {
  const loggedInUser = useLoginStore((state) => state.loggedInUser)
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)

  const borrowBook = useSWRMutation(
    "borrow-book",
    async (_, { arg }: { arg: string }) => {
      const response = await fetch(`http://localhost:3001/books/${id}/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowedBy: arg }),
      })
      return response.json()
    }
  )

  return (
    <Button
      disabled={
        status !== BookStatus.AVAILABLE ||
        borrowBook.isMutating ||
        isLoggedIn === undefined
      }
      onClick={() => {
        borrowBook.trigger(loggedInUser!.id, {
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
