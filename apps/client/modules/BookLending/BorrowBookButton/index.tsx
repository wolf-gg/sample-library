"use client"

import { Button } from "client/libs/shadcn/button"
import { useLoginStore } from "client/stores/login"
import { useState } from "react"
import { BorrowDialog } from "./BorrowDialog"
import { LoginDialog } from "./LoginDialog"

export const BorrowBookButton: React.FC<{
  id: string
}> = ({ id }) => {
  const [open, setOpen] = useState(false)

  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)
  const loggedInUser = useLoginStore((state) => state.loggedInUser)

  return (
    <>
      <Button
        disabled={isLoggedIn === undefined}
        onClick={() => {
          setOpen(true)
        }}
      >
        Borrow
      </Button>
      {loggedInUser !== undefined && isLoggedIn === true ? (
        <BorrowDialog
          id={id}
          loggedInUserId={loggedInUser.id}
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            setOpen(false)
          }}
        />
      ) : (
        <LoginDialog open={open} onOpenChange={setOpen} />
      )}
    </>
  )
}
