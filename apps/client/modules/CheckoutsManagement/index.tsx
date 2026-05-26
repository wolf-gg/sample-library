"use client"

import { LoadingScreen } from "client/components/LoadingScreen"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "client/libs/shadcn/table"
import { AdminCheckoutRecordDto } from "common/dto/history"
import useSWR from "swr"
import { CheckoutRecordRow } from "./CheckoutRecordRow"

export const CheckoutsManagement: React.FC = () => {
  const { data } = useSWR<AdminCheckoutRecordDto[]>(
    ["checkout-management-records", "admin"],
    async () => {
      const response = await fetch(`http://localhost:3001/admin/history`)
      return response.json()
    }
  )

  if (data === undefined) {
    return <LoadingScreen message="Loading current checkouts..." />
  }

  return (
    <Table>
      <TableCaption>
        A list of checkout records made by the members of the library.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Book</TableHead>
          <TableHead>Borrower Name</TableHead>
          <TableHead>Checkout Date</TableHead>
          <TableHead>Returned</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <CheckoutRecordRow
            key={record.id}
            recordId={record.id}
            borrowerName={record.borrowerName}
            bookTitle={record.bookTitle}
            borrowedAt={record.borrowedAt}
            returned={record.returned}
          />
        ))}
      </TableBody>
    </Table>
  )
}
