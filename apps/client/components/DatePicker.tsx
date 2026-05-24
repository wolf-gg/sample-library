"use client"

import { Button } from "client/libs/shadcn/button"
import { Calendar } from "client/libs/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "client/libs/shadcn/popover"
import { ChevronDownIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const DatePicker: React.FC<{
  selectedDate?: Date
  onSelect?: (date: Date) => void
  disableFutureDates?: boolean
}> = ({ selectedDate, onSelect, disableFutureDates }) => {
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    selectedDate
  )

  useEffect(() => {
    setInternalDate(selectedDate)
  }, [selectedDate])

  const date = selectedDate ?? internalDate

  const handleSelect = (value: Date | undefined) => {
    setInternalDate(value)
    if (value) {
      onSelect?.(value)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? date.toLocaleDateString() : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          required={false}
          selected={date}
          onSelect={handleSelect}
          defaultMonth={date}
          disabled={
            disableFutureDates ? (date) => date > new Date() : undefined
          }
        />
      </PopoverContent>
    </Popover>
  )
}
