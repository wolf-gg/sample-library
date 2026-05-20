import { Loader, LoaderCircle } from "lucide-react"

export const LoadingScreen: React.FC<{ message?: string }> = ({ message }) => {
  const displayMessage = message || "Loading..."

  return (
    <div className="flex grow flex-row items-center justify-center gap-2">
      <LoaderCircle className="animate-spin" />
      <p>{displayMessage}</p>
    </div>
  )
}
