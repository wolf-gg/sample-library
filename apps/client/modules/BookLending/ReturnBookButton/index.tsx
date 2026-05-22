"use client"

import { Button } from "client/libs/shadcn/button"
import { BookStatus } from "common/dto/book"
import { getOverdueDays } from "common/utils/book"
import { useState } from "react"
import { OverdueDialog } from "./OverdueDialog"
import { ReturnBookDialog } from "./ReturnBookDialog"

export const ReturnBookButton: React.FC<{
  id: string
  status: BookStatus
  borrowedAt: string
}> = ({ id, status, borrowedAt }) => {
  const [open, setOpen] = useState(false)

  const overdueDays = getOverdueDays(borrowedAt)
  const isOverdue = status === BookStatus.OVERDUE && overdueDays > 0

  console.log(overdueDays, status)

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Return
      </Button>
      {isOverdue ? (
        <OverdueDialog
          id={id}
          overdueDays={overdueDays}
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            setOpen(false)
          }}
        />
      ) : (
        <ReturnBookDialog
          id={id}
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            setOpen(false)
          }}
        />
      )}
    </>
  )
}
