import { TableCell, TableRow } from "client/libs/shadcn/table"
import { cn } from "client/libs/utils"
import { Check, X } from "lucide-react"

export const CheckoutRecordRow: React.FC<{
  bookTitle?: string
  borrowedAt: string
  returnedAt?: string
  returned: boolean
}> = ({ bookTitle, borrowedAt, returnedAt, returned }) => (
  <TableRow>
    <TableCell className={cn(bookTitle ? "" : "text-red-400")}>
      {bookTitle || "(Deleted book)"}
    </TableCell>
    <TableCell>{new Date(borrowedAt).toLocaleString()}</TableCell>
    <TableCell>
      {returnedAt ? new Date(returnedAt).toLocaleString() : "-"}
    </TableCell>
    <TableCell className="flex justify-end">
      {returned ? <Check /> : <X />}
    </TableCell>
  </TableRow>
)
