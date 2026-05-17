export const BookCard: React.FC<{ title: string; author: string }> = ({
  title,
  author,
}) => (
  <div className="flex flex-col rounded-lg border border-2 border-muted-foreground p-4">
    <h2 className="text-md font-bold">{title}</h2>
    <h3 className="text-sm text-muted-foreground">{author}</h3>
  </div>
)
