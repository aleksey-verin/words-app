import { UserDictionary } from '@/api/dictionary/types'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import TopTitle from '@/components/ui/top-title'
import TypographyH3 from '@/components/ui/typography/typography-h3'
import TypographyH4 from '@/components/ui/typography/typography-h4'
import TypographyP from '@/components/ui/typography/typography-p'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/routes'
import {
  getTrainingList,
  // getTrainingQuestionsForDefinitions,
  // getTrainingQuestionsForWords,
  selectorUserTrainingSlice,
  TrainingType,
} from '@/store/reducers/userTrainingSlice'
import { Link } from 'react-router-dom'

interface TrainingItem {
  title: string
  description: string
  to: string
  type: TrainingType
  min_count: number
  max_count: number
}

const trainingItems: TrainingItem[] = [
  {
    title: 'Words',
    description: 'Choose the correct definition for the given word.',
    to: ROUTES.TRAINING_WORDS,
    type: 'WORDS',
    min_count: 4,
    max_count: 10,
  },
  {
    title: 'Definitions',
    description: 'Choose the correct word for the given definition.',
    to: ROUTES.TRAINING_DEFINITIONS,
    type: 'DEFINITIONS',
    min_count: 4,
    max_count: 10,
  },
  {
    title: 'Sprint',
    description: 'Fast learning of many words in a short period of time.',
    to: ROUTES.TRAINING_SPRINT,
    type: 'SPRINT',
    min_count: 10,
    max_count: 20,
  },
  {
    title: 'Letters',
    description: 'Make up the correct word from the given letters.',
    to: ROUTES.TRAINING_LETTERS,
    type: 'LETTERS',
    min_count: 10,
    max_count: 10,
  },
]

const PageTraining = () => {
  const dispatch = useAppDispatch()
  const { allWordsForTraining } = useAppSelector(selectorUserTrainingSlice)

  const handleStartTrainingButton = (
    words_for_training: UserDictionary,
    count: number,
    type: TrainingType
  ) => {
        dispatch(
          getTrainingList({
            type,
            dictionary: words_for_training,
            wordsCount: count,
          })
        )
    }
  
  // useEffect(() => {
  //   dispatch(getAllWordsForTraining(dictionary))
  // }, [dictionary, dispatch])

  return (
    <main className='min-h-dvh pt-3 px-2 pb-20 flex flex-col gap-4'>
      <TopTitle className='flex items-center gap-2'>
        Training<Badge variant='secondary'>{allWordsForTraining.length}</Badge>
      </TopTitle>
      <div className='flex-auto flex flex-col items-center justify-center gap-4'>
        <TypographyH3>Choose your workout:</TypographyH3>
        <div className='w-full grid grid-cols-2 gap-4'>
          {trainingItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                'p-2 border rounded-lg flex flex-col gap-1 items-center',
                item.min_count > allWordsForTraining.length
                  ? 'opacity-50 pointer-events-none'
                  : ''
              )}
            >
              <TypographyH4>{item.title}</TypographyH4>
              <TypographyP className='text-xs text-muted-foreground text-center flex-auto'>
                {item.description}
              </TypographyP>
              <Link
                to={item.to}
                onClick={() =>
                  handleStartTrainingButton(
                    allWordsForTraining,
                    item.max_count,
                    item.type
                  )
                }
                className={cn(
                  'w-full max-w-52',
                  buttonVariants({ variant: 'outline' }),
                  item.min_count > allWordsForTraining.length
                    ? 'pointer-events-none'
                    : ''
                )}
              >
                {item.min_count > allWordsForTraining.length
                  ? 'Need more words'
                  : 'Go to training!'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default PageTraining
