import { Button } from '@/components/ui/button'
import TopTitle from '@/components/ui/top-title'
import TypographyH4 from '@/components/ui/typography/typography-h4'
import TypographyP from '@/components/ui/typography/typography-p'
import { ROUTES } from '@/routes'
import { Link } from 'react-router-dom'

const trainingItems = [
  {
    title: 'Words',
    to: ROUTES.TRAINING_WORDS,
    description: 'Choose the correct definition for the given word.',
  },
  {
    title: 'Definitions',
    description: 'Choose the correct word for the given definition.',
    to: ROUTES.TRAINING_DEFINITIONS,
  },
  {
    title: 'Sprint',
    description: 'Fast learning of many words in a short period of time.',
    to: ROUTES.TRAINING_SPRINT,
  },
  {
    title: 'Letters',
    description: 'Make up the correct word from the given letters.',
    to: ROUTES.TRAINING_LETTERS,
  },
]

const PageTraining = () => {
  return (
    <main className='h-full pt-3 px-2 pb-16 flex flex-col gap-4'>
      <TopTitle>Training</TopTitle>
      <div className='flex-auto flex flex-col items-center justify-center gap-4'>
        <TypographyH4>Choose your workout:</TypographyH4>
        <div className='w-full grid grid-cols-2 gap-4'>
          {trainingItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className='p-2 border rounded-lg flex flex-col gap-1 items-center'
            >
              <TypographyH4>{item.title}</TypographyH4>
              <TypographyP className='text-xs text-muted-foreground text-center flex-auto'>{item.description}</TypographyP>
              <Button className='w-full max-w-52' variant='secondary'>
                Go
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default PageTraining
