import { Button } from "client/libs/shadcn/button"
import { BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export const RegisterButton: React.FC = () => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push("/register")}
      className="flex flex-row items-center gap-1"
      variant="default"
    >
      <BookOpen size={16} />
      Register
    </Button>
  )
}
