"use client"

import { Button } from "client/libs/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "client/libs/shadcn/dialog"
import { useLoginStore } from "client/stores/login"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export const LogoutButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex flex-row items-center gap-1"
          variant="secondary"
        >
          <LogOut size={16} />
          <p>Logout</p>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <LogoutConfirmationButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const LogoutConfirmationButton: React.FC = () => {
  const router = useRouter()
  const clearUserDetails = useLoginStore((state) => state.clearUserDetails)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Confirm</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle>Logout Successful</DialogTitle>
        <DialogDescription>
          You have been successfully logged out. You will need to login again to
          borrow books.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                clearUserDetails()
                router.push("/")
              }}
            >
              Return to Homepage
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
