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
import { useLoginStore } from "client/stores/login"
import { CheckoutRecordDto } from "common/dto/history"
import useSWR from "swr"
import { CheckoutRecordRow } from "./CheckoutRecordRow"

const CheckoutRecordsTableWithUser: React.FC<{ userId: string }> = ({
  userId,
}) => {
  const { data } = useSWR<CheckoutRecordDto[]>(
    ["checkout-records", userId],
    async () => {
      const response = await fetch(`http://localhost:3001/history/${userId}`)
      return response.json()
    }
  )

  if (data === undefined) {
    return <LoadingScreen message="Loading checkout history..." />
  }

  return (
    <Table>
      <TableCaption>A list of checkout records made by the user.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Book</TableHead>
          <TableHead>Checkout Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead className="text-right">Returned</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <CheckoutRecordRow
            key={record.id}
            bookTitle={record.bookTitle}
            borrowedAt={record.borrowedAt}
            returnedAt={record.returnedAt}
            returned={record.returned}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export const CheckoutRecordsTable: React.FC = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)
  const loggedInUser = useLoginStore((state) => state.loggedInUser)

  if (isLoggedIn !== true || loggedInUser === undefined) {
    return <></>
  }

  return <CheckoutRecordsTableWithUser userId={loggedInUser.id} />
}
