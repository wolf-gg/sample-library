import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "client/libs/shadcn/field"
import { Input } from "client/libs/shadcn/input"
import { BookDto, FindAllBooksResponse } from "common/dto/book"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import z from "zod"

const formSchema = z.object({
  title: z.string().nonempty("Book title must not be empty"),
  author: z.string().nonempty("Book author must not be empty"),
})

type Form = z.infer<typeof formSchema>

export const UpdateBookButton: React.FC<{ book: BookDto }> = ({ book }) => {
  const [open, setOpen] = useState(false)

  const updateBook = useSWRMutation(
    "update-book",
    async (_, { arg }: { arg: { id: string; data: Form } }) => {
      const response = await fetch(`http://localhost:3001/books/${arg.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg.data),
      })

      return response.json()
    }
  )

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
    },
  })

  useEffect(() => {
    form.reset({ title: book.title, author: book.author })
  }, [book.title, book.author, form])

  const onSubmit = (data: Form) => {
    updateBook.trigger(
      { id: book.id, data },
      {
        onSuccess: (updatedBook: BookDto) => {
          setOpen(false)
          mutate("fetch-all-books", (prev?: FindAllBooksResponse) => {
            if (prev === undefined) {
              return prev
            }

            return {
              count: prev.count,
              books: prev.books.map((existingBook) =>
                existingBook.id === updatedBook.id ? updatedBook : existingBook
              ),
            }
          })
        },
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          form.reset({ title: book.title, author: book.author })
        }
        setOpen(nextOpen)
      }}
    >
      <form
        id={`update-book-form-${book.id}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DialogTrigger asChild>
          <Button variant="secondary" className="h-10 w-10">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit book</DialogTitle>
            <DialogDescription>
              Update the book title and author
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="book-title">Title</FieldLabel>
                  <Input {...field} id="book-title" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="author"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="book-author">Author</FieldLabel>
                  <Input {...field} id="book-author" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() =>
                  form.reset({ title: book.title, author: book.author })
                }
              >
                Cancel
              </Button>
            </DialogClose>
            <Button form={`update-book-form-${book.id}`} type="submit">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
