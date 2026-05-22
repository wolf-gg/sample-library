"use client"

import { Button } from "client/libs/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "client/libs/shadcn/dialog"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"

const OVERDUE_RATE = 0.5

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`

export const OverdueDialog: React.FC<{
  id: string
  open: boolean
  overdueDays: number
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}> = ({ id, open, overdueDays, onOpenChange, onConfirm }) => {
  const totalAmount = overdueDays * OVERDUE_RATE

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Return overdue book</DialogTitle>
          <DialogDescription>
            This book is overdue by {overdueDays} day
            {overdueDays === 1 ? "" : "s"}. You need to pay{" "}
            {formatCurrency(OVERDUE_RATE)} per overdue day.
          </DialogDescription>
          <div className="mt-4 rounded-xl border border-muted-foreground/20 bg-muted px-4 py-3 text-sm">
            <p className="font-medium">Total amount due</p>
            <p className="text-lg font-semibold">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={returnBook.isMutating}
            onClick={() => {
              returnBook.trigger(id, {
                onSuccess: () => {
                  onConfirm()
                  mutate("fetch-all-books")
                },
              })
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
