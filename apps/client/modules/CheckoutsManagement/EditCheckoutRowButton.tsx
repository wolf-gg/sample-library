"use client"

import { DatePicker } from "client/components/DatePicker"
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
import { UpdateRecordDto } from "common/dto/history"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const EditCheckoutRowButton: React.FC<{
  recordId: string
  initialDate: string
}> = ({ recordId, initialDate }) => {
  const parsedDate = new Date(initialDate)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate
  )
  const [open, setOpen] = useState(false)

  const updateRecord = useSWRMutation(
    "update-book",
    async (_, { arg }: { arg: UpdateRecordDto }) => {
      const response = await fetch(
        `http://localhost:3001/admin/history/${recordId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arg),
        }
      )

      return response.json()
    }
  )

  const handleSave = async () => {
    if (!selectedDate) {
      return
    }

    await updateRecord.trigger({
      borrowedAt: selectedDate.toISOString(),
    })
    setOpen(false)
    mutate(["checkout-management-records", "admin"])
    toast.success("Record updated successfully")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-8 h-8">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Edit the checkout record for this book.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row pb-40 items-center gap-4">
          <p className="font-bold">Date:</p>
          <DatePicker
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
            disableFutureDates
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!selectedDate}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
