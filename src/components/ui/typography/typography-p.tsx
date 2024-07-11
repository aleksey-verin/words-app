import { cn } from "@/lib/utils"

interface TypographyPProps extends React.HTMLAttributes<HTMLHeadElement> {}

const TypographyP = ({ className, ...props }: TypographyPProps) => {
  return <p className={cn('leading-7', className)} {...props} />
}

export default TypographyP