import { TableCell, TableRow } from "client/libs/shadcn/table"
import { Check, X } from "lucide-react"

export const CheckoutRecordRow: React.FC<{
  bookTitle: string
  borrowedAt: string
  returnedAt?: string
  returned: boolean
}> = ({ bookTitle, borrowedAt, returnedAt, returned }) => (
  <TableRow>
    <TableCell>{bookTitle}</TableCell>
    <TableCell>{new Date(borrowedAt).toLocaleString()}</TableCell>
    <TableCell>
      {returnedAt ? new Date(returnedAt).toLocaleString() : "-"}
    </TableCell>
    <TableCell className="flex justify-end">
      {returned ? <Check /> : <X />}
    </TableCell>
  </TableRow>
)
