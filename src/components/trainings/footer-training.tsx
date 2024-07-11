import { Meh, Smile } from 'lucide-react'
import TypographyP from '../ui/typography/typography-p'

const FooterTraining = ({
  correct,
  incorrect,
}: {
  correct: number
  incorrect: number
}) => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='flex items-center justify-center py-1 px-2 border rounded-lg'>
        <div className='grid grid-cols-2'>
          <div className='p-1 pr-2 border-r flex items-center gap-1'>
            <Smile className='w-6 h-6' />
            <TypographyP>{correct}</TypographyP>
          </div>
          <div className='p-1 pl-2 flex items-center gap-1'>
            <Meh className='w-6 h-6' />
            {incorrect}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTraining
