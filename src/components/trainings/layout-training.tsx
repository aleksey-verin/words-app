import { cn } from '@/lib/utils'

interface LayoutTrainingProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutTraining = ({ className, children, ...props }: LayoutTrainingProps) => {
  return (
    <div className={cn('w-full min-h-dvh flex flex-col items-center justify-between gap-2 p-4', className)} {...props}>
      {children}
    </div>
  )
}

export default LayoutTraining
