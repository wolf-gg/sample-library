"use client"

import { Button } from "client/libs/shadcn/button"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export const LoginButton: React.FC = () => {
  const router = useRouter()

  return (
    <Button
      className="flex flex-row items-center gap-1"
      variant="secondary"
      onClick={() => {
        router.push("/login")
      }}
    >
      <LogIn size={16} />
      <p>Login</p>
    </Button>
  )
}
