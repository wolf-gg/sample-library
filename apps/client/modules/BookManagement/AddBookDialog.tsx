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
import { Label } from "client/libs/shadcn/label"
import { BookDto, FindAllBooksResponse } from "client/types"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Key, mutate } from "swr"
import useSWRMutation from "swr/mutation"
import z from "zod"

const formSchema = z.object({
  title: z.string().nonempty("Book title must not be empty"),
  author: z.string().nonempty("Book author must not be empty"),
})

type Form = z.infer<typeof formSchema>

export const AddBookDialog: React.FC = () => {
  const [open, setOpen] = useState(false)

  const addBook = useSWRMutation(
    "add-book",
    async (_, { arg }: { arg: Form }) => {
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      })
      return response.json()
    }
  )

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
    },
  })

  const onSubmit = (data: Form) => {
    addBook.trigger(data, {
      onSuccess: (newBook: BookDto) => {
        setOpen(false)
        form.reset()
        mutate("fetch-all-books", (prev?: FindAllBooksResponse) => {
          if (prev === undefined) {
            return prev
          }

          return {
            count: prev.count + 1,
            books: [...prev.books, newBook],
          }
        })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="add-book-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button className="align-center flex flex-row gap-1">
            <Plus />
            <p>Add book</p>
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Add book</DialogTitle>
            <DialogDescription>Add a new book to the library</DialogDescription>
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
              <Button onClick={() => form.reset()} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button form="add-book-form" type="submit">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
