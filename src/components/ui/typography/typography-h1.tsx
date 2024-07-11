import { cn } from "@/lib/utils"

interface TypographyH1Props extends React.HTMLAttributes<HTMLHeadElement> {}

const TypographyH1 = ({ className, ...props }: TypographyH1Props) => {
  return <h1 className={cn('scroll-m-20 text-4xl font-semibold tracking-tight', className)} {...props} />
}

export default TypographyH1