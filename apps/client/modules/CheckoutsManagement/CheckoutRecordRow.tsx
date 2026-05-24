import { TableCell, TableRow } from "client/libs/shadcn/table"
import { Check, X } from "lucide-react"
import { EditCheckoutRowButton } from "./EditCheckoutRowButton"

export const CheckoutRecordRow: React.FC<{
  recordId: string
  bookTitle: string
  borrowedAt: string
  returned: boolean
}> = ({ recordId, bookTitle, borrowedAt, returned }) => (
  <TableRow>
    <TableCell>{bookTitle}</TableCell>
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
