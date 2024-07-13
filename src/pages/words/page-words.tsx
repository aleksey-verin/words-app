import TopTitle from '@/components/ui/top-title'
import { useAppSelector } from '@/hooks/store-hook'
import { selectorUserDictionarySlice } from '@/store/reducers/userDictionarySlice'
import WordsList from './words-list'
import { Badge } from '@/components/ui/badge'

const PageWords = () => {
  const { dictionary, isSuccess, isLoading, isError } = useAppSelector(selectorUserDictionarySlice)

  return (
    <main className='h-full pt-3 px-2 pb-20 flex flex-col gap-4'>
      <TopTitle className='flex items-center gap-2'>My words<Badge variant='secondary'>{dictionary.length}</Badge></TopTitle>
      <WordsList dictionary={dictionary} isLoading={isLoading} isSuccess={isSuccess} isError={isError} />
    </main>
  )
}

export default PageWords
