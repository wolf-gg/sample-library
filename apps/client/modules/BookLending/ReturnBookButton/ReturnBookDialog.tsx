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

export const ReturnBookDialog: React.FC<{
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}> = ({ id, open, onOpenChange, onConfirm }) => {
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
          <DialogTitle>Return book</DialogTitle>
          <DialogDescription>
            Once you return this book, other users will be able to check it out.
            Are you sure you want to proceed?
          </DialogDescription>
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
