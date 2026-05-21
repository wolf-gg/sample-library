"use client"

import { Button } from "client/libs/shadcn/button"
import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { ReturnBookDialog } from "./ReturnBookDialog"

export const ReturnBookButton: React.FC<{
  id: string
}> = ({ id }) => {
  const [open, setOpen] = useState(false)

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
    <>
      <Button
        disabled={returnBook.isMutating}
        onClick={() => {
          setOpen(true)
        }}
      >
        Return
      </Button>
      <ReturnBookDialog
        id={id}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          setOpen(false)
        }}
      />
    </>
  )
}
