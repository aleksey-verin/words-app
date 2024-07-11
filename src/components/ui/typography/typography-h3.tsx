import { cn } from "@/lib/utils"

interface TypographyH3Props extends React.HTMLAttributes<HTMLHeadElement> {}

const TypographyH3 = ({ className, ...props }: TypographyH3Props) => {
  return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
}

export default TypographyH3