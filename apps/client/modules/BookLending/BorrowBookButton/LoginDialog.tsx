import { Button } from "client/libs/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "client/libs/shadcn/dialog"
import { useRouter } from "next/navigation"

export const LoginDialog: React.FC<{
  open: boolean
  onOpenChange: (open: boolean) => void
}> = ({ open, onOpenChange }) => {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Only signed in users can borrow books</DialogTitle>
          <DialogDescription>
            You must be signed in to borrow books. Please login or register to
            continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              router.push("/login")
            }}
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
