import { Button } from "client/libs/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "client/libs/shadcn/dialog"
import { FindAllBooksResponse } from "common/dto/book"
import { Trash } from "lucide-react"
import { useState } from "react"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const RemoveBookButton: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  const [open, setOpen] = useState(false)

  const removeBook = useSWRMutation(
    "remove-book",
    async (_, { arg }: { arg: string }) => {
      const response = await fetch(`http://localhost:3001/books/${arg}`, {
        method: "DELETE",
      })
      return response.text()
    }
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{`Remove "${title}"`}</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this book from the library?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => {
              removeBook.trigger(id, {
                onSuccess: (deletedBookId: string) => {
                  setOpen(false)
                  mutate("fetch-all-books", (prev?: FindAllBooksResponse) => {
                    if (prev === undefined) {
                      return prev
                    }

                    return {
                      count: prev.count - 1,
                      books: prev.books.filter(
                        (book) => book.id === deletedBookId
                      ),
                    }
                  })
                },
              })
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
