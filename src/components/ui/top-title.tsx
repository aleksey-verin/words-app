import { cn } from '@/lib/utils'
import TypographyH3 from './typography-h3'

interface TopTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

const TopTitle = ({ className, ...props }: TopTitleProps) => {
  return <TypographyH3 className={cn(className)} {...props} />
}

export default TopTitle
