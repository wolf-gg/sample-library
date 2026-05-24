import { TableCell, TableRow } from "client/libs/shadcn/table"

export const PaymentRow: React.FC<{
  bookTitle: string
  amount: number
  paidAt: string
}> = ({ bookTitle, amount, paidAt }) => (
  <TableRow>
    <TableCell>{bookTitle}</TableCell>
    <TableCell>{new Date(paidAt).toLocaleString()}</TableCell>
    <TableCell className="text-right">{`$${amount.toFixed(2)}`}</TableCell>
  </TableRow>
)
