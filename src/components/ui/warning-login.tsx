import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from './button'

interface WarningLoginProps extends React.HTMLAttributes<HTMLDivElement> { text: string}

const WarningLogin = ({ className, text, ...props }: WarningLoginProps) => {
  return (
    <div className={cn('w-full flex items-center justify-between gap-2', className)} {...props}>
      <div className='flex items-center gap-2'>
        <TriangleAlert className='h-5 w-5' />
        <p className='text-sm'>{text}</p>
      </div>
      <Link
        to='/login'
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Go to Login
      </Link>
    </div>
  )
}

export default WarningLogin
