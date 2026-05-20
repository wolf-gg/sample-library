"use client"

import { LoginButton, LogoutButton } from "client/modules"
import { useLoginStore } from "client/stores/login"

export const UserMenu: React.FC = () => {
  const loggedInUser = useLoginStore((state) => state.loggedInUser)
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)

  if (isLoggedIn === true) {
    return (
      <div className="flex flex-row items-center gap-4">
        <p>
          Welcome,{" "}
          <span className="font-bold">
            {loggedInUser
              ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
              : "Guest"}
          </span>
        </p>
        <LogoutButton />
      </div>
    )
  } else if (isLoggedIn === false) {
    return <LoginButton />
  } else {
    return <></>
  }
}
