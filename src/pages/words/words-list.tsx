import { UserDictionary } from '@/api/dictionary/types'
import WordsItem from './words-item'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyH4 } from '@/components/ui/typography-h4'

const WordsList = ({
  dictionary,
  isLoading,
  isSuccess,
  isError,
}: {
  dictionary: UserDictionary
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}) => {

  const isDictionaryEmpty = dictionary.length === 0

  if (isLoading)
    return (
      <div className='flex flex-col gap-2'>
        {new Array(3).fill(0).map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-28 mt-2' />
            <Skeleton className='h-1 w-full' />
            <Skeleton className='h-24 w-full' />
          </div>
        ))}
      </div>
    )

  if (isDictionaryEmpty && (isSuccess || isError) ) return (
  <TypographyH4>You don't have any saved words</TypographyH4>
)

  return (
    <div className='flex flex-col gap-4' >
      {dictionary.map((item, index) => (
        <WordsItem key={index} word={item} />
      ))}
    </div>
  )
}

export default WordsList
