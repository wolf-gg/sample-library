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

export const BorrowDialog: React.FC<{
  id: string
  loggedInUserId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}> = ({ id, loggedInUserId, open, onOpenChange, onConfirm }) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Borrow book for 7 days</DialogTitle>
          <DialogDescription>
            You can borrow this book for up to 7 days. If you keep it longer,
            you will be charged a late fee.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={borrowBook.isMutating}
            onClick={() => {
              borrowBook.trigger(loggedInUserId, {
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
