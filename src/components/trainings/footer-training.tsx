import { Meh, Smile } from 'lucide-react'
import TypographyP from '../ui/typography/typography-p'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const FooterTraining = ({
  correct,
  incorrect,
}: {
  correct: number
  incorrect: number
}) => {

  const [correctChanged, setCorrectChanged] = useState<boolean>(false)
  const [incorrectChanged, setIncorrectChanged] = useState<boolean>(false)

  useEffect(() => {
    setCorrectChanged(true)
    setTimeout(() => {
      setCorrectChanged(false)
    }, 1000)
  }, [correct])

  useEffect(() => {
    setIncorrectChanged(true)
    setTimeout(() => {
      setIncorrectChanged(false)
    }, 1000)
  }, [incorrect])

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='grid grid-cols-2 border rounded-lg overflow-hidden'>
        <div className={cn('flex items-center justify-center py-1 pl-2', correctChanged && 'bg-green-300 dark:bg-green-900')}>
          <div className={cn('p-0.5 pr-2 border-r flex items-center gap-1')}>
            <Smile className='w-6 h-6' />
            <TypographyP>{correct}</TypographyP>
          </div>
        </div>
        <div className={cn('flex items-center justify-center py-1 pr-2', incorrectChanged && 'bg-red-300 dark:bg-red-900')}>
          <div className={cn('p-0.5 pl-2 flex items-center gap-1')}>
            <Meh className='w-6 h-6' />
            {incorrect}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTraining
