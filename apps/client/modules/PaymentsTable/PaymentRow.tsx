import { TableCell, TableRow } from "client/libs/shadcn/table"
import { cn } from "client/libs/utils"

export const PaymentRow: React.FC<{
  bookTitle?: string
  amount: number
  paidAt: string
}> = ({ bookTitle, amount, paidAt }) => (
  <TableRow>
    <TableCell className={cn(bookTitle ? "" : "text-red-400")}>
      {bookTitle || "(Deleted book)"}
    </TableCell>
    <TableCell>{new Date(paidAt).toLocaleString()}</TableCell>
    <TableCell className="text-right">{`$${amount.toFixed(2)}`}</TableCell>
  </TableRow>
)
