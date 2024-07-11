import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

const HeaderTraining = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <header className='w-full flex items-center justify-between gap-2'>
      <Button onClick={handleClose} size={'icon'} variant='ghost'>
        <X className='w-6 h-6' />
      </Button>
      <Progress value={10} className='flex-auto h-2' />
    </header>
  )
}

export default HeaderTraining
