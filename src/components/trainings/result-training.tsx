import { TrainingQuestion } from '@/api/training/types'
import TypographyH4 from '../ui/typography/typography-h4'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/routes'

const ResultTraining = ({
  correct,
  incorrect,
  trainingList,
}: {
  correct: number
  incorrect: number
  trainingList: TrainingQuestion[]
}) => {

  return (
    <div className='flex flex-col gap-2'>
      <TypographyH4>
        You have {correct} correct and {incorrect} incorrect answers
      </TypographyH4>
      <div className='flex flex-col gap-2'>
        {trainingList.map((question, index) => (
          <div
            key={index}
            className='flex flex-col border rounded-xl overflow-hidden items-center'
          >
            <div className='w-full px-2 py-1 border-b text-center bg-muted text-sm '>
              {question.question}
            </div>
            <div
              className={cn(
                'w-full p-1 text-center text-sm',
                question.isUserAnswerCorrect
                  ? 'bg-green-300 dark:bg-green-900'
                  : 'bg-red-300 dark:bg-red-900'
              )}
            >
              {question.answers.join(' | ')}
            </div>
            {!question.isUserAnswerCorrect && (
              <div className='w-full p-1 text-center text-sm'>
                {question.correctAnswer}
              </div>
            )}
          </div>
        ))}
        <TypographyH4 className='text-center'>Good luck!</TypographyH4>
        <div className='w-full flex gap-1 items-center justify-between'>
          <Link
            to={ROUTES.TRAINING}
            className={cn(buttonVariants({ variant: 'default' }), 'flex-1')}
          >
            <CircleArrowLeft className='w-5 h-5 mr-2' />
            Trainings
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResultTraining
