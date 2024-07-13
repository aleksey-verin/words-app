import TopTitle from '@/components/ui/top-title'
import SearchForm from './search-form'
import { cn } from '@/lib/utils'
import SearchResult from './search-result'
import SearchError from './search-error'
import { useAppSelector } from '@/hooks/store-hook'
import { selectorSearchSlice } from '@/store/reducers/searchSlice'

const PageSearch = () => {
  const { requestedResult, errorMessage, isError } =
    useAppSelector(selectorSearchSlice)

  return (
    <main className='relative min-h-dvh pt-4 px-4 flex flex-col gap-4'>
      <TopTitle>Search for the meaning</TopTitle>
      <div
        className={cn(
          'absolute inset-x-4 flex flex-col justify-start items-center gap-4 transition-all duration-1000',
          requestedResult ? 'top-16' : 'top-[calc(50%-2rem)]'
        )}
      >
        <SearchForm />
        {requestedResult && <SearchResult />}
        {isError && <SearchError text={errorMessage} />}
      </div>
    </main>
  )
}

export default PageSearch
