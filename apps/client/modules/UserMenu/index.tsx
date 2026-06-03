"use client"

import { useLoginStore } from "client/stores/login"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { RegisterButton } from "./RegisterButton"

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
    return (
      <div className="flex flex-row items-center gap-4">
        <LoginButton />
        <RegisterButton />
      </div>
    )
  } else {
    return <></>
  }
}
