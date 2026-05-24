"use client"

import { ADMIN_USERNAME } from "client/constants/admin"
import { NavigationMenuLink } from "client/libs/shadcn/navigation-menu"
import { useLoginStore } from "client/stores/login"

export const BorrowMenuLink: React.FC = () => {
  const loggedInUser = useLoginStore((state) => state.loggedInUser)
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)

  // If a guest is viewing the website, expose the borrow page so
  // that they can view the books that are available
  if (isLoggedIn === undefined && loggedInUser === undefined) {
    return <></>
  } else if (isLoggedIn === false && loggedInUser === undefined) {
    return <NavigationMenuLink href="/">Borrow Books</NavigationMenuLink>
  }

  if (loggedInUser === undefined) {
    return <></>
  }

  if (isLoggedIn === true && loggedInUser.username === ADMIN_USERNAME) {
    return <></>
  }

  return <NavigationMenuLink href="/">Borrow Books</NavigationMenuLink>
}
