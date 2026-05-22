"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "client/libs/shadcn/table"
import { useLoginStore } from "client/stores/login"
import { PaymentDto } from "common/dto/payment"
import useSWR from "swr"
import { PaymentRow } from "./PaymentRow"

const PaymentsTableWithUser: React.FC<{ userId: string }> = ({ userId }) => {
  const { data } = useSWR<PaymentDto[]>(["payments", userId], async () => {
    const response = await fetch(`http://localhost:3001/payments/${userId}`)
    return response.json()
  })

  if (data === undefined) {
    return <></>
  }

  return (
    <Table>
      <TableCaption>
        A list of overdue payment records by the user.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Book</TableHead>
          <TableHead>Paid Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((payment) => (
          <PaymentRow
            key={payment.id}
            bookTitle={payment.book.title}
            paidAt={payment.paidAt}
            amount={payment.amount}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-bold" colSpan={2}>
            Total
          </TableCell>
          <TableCell className="font-bold text-right">
            {`$${data.reduce((total, { amount }) => total + amount, 0)}`}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const PaymentsTable: React.FC = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)
  const loggedInUser = useLoginStore((state) => state.loggedInUser)

  if (isLoggedIn !== true || loggedInUser === undefined) {
    return <></>
  }

  return <PaymentsTableWithUser userId={loggedInUser.id} />
}
