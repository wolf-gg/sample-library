import { UserDto } from "common/dto/user"
import { persist } from "zustand/middleware"
import { create } from "zustand/react"

type LoginStore = {
  loggedInUser?: UserDto
  isLoggedIn?: boolean
  storeUserDetails: (user: UserDto) => void
  clearUserDetails: () => void
}

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      loggedInUser: undefined,
      isLoggedIn: undefined,
      storeUserDetails: (user: UserDto) => {
        set({ loggedInUser: user, isLoggedIn: true })
      },
      clearUserDetails: () => {
        set({ loggedInUser: undefined, isLoggedIn: false })
      },
    }),
    {
      name: "login-store",
    }
  )
)
