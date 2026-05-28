import { TableCell, TableRow } from "client/libs/shadcn/table"
import { cn } from "client/libs/utils"
import { Check, X } from "lucide-react"
import { EditCheckoutRowButton } from "./EditCheckoutRowButton"

export const CheckoutRecordRow: React.FC<{
  recordId: string
  bookTitle?: string
  borrowerName?: string
  borrowedAt: string
  returned: boolean
}> = ({ recordId, bookTitle, borrowerName, borrowedAt, returned }) => (
  <TableRow>
    <TableCell className={cn(bookTitle ? "" : "text-red-400")}>
      {bookTitle || "(Deleted book)"}
    </TableCell>
    <TableCell>{`${borrowerName !== undefined ? borrowerName : "-"}`}</TableCell>
    <TableCell>{new Date(borrowedAt).toLocaleString()}</TableCell>
    <TableCell>{returned ? <Check /> : <X />}</TableCell>
    <TableCell className="flex justify-end">
      {returned === false ? (
        <EditCheckoutRowButton recordId={recordId} initialDate={borrowedAt} />
      ) : (
        <></>
      )}
    </TableCell>
  </TableRow>
)
