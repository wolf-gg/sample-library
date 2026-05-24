"use client"

import { ADMIN_USERNAME } from "client/constants/admin"
import { NavigationMenuLink } from "client/libs/shadcn/navigation-menu"
import { useLoginStore } from "client/stores/login"

export const ManageCheckoutsMenuLink: React.FC = () => {
  const loggedInUser = useLoginStore((state) => state.loggedInUser)
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)

  if (isLoggedIn === undefined || loggedInUser === undefined) {
    return <></>
  }

  if (isLoggedIn === true && loggedInUser.username === ADMIN_USERNAME) {
    return (
      <NavigationMenuLink href="/admin/checkouts">
        Manage Checkouts
      </NavigationMenuLink>
    )
  }

  return <></>
}
