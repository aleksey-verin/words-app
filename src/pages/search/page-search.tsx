import TopTitle from '@/components/ui/top-title'
import SearchForm from './search-form'
import { cn } from '@/lib/utils'
import SearchResult from './search-result'
import SearchError from './search-error'
import { useAppSelector } from '@/hooks/store-hook'
import { selectorSearchSlice } from '@/store/reducers/searchSlice'

const PageSearch = () => {
  const { requestedResult, errorMessage } = useAppSelector(selectorSearchSlice)

  return (
    <main className='relative h-full pt-3 px-2 flex flex-col gap-4'>
      <TopTitle>Search for the meaning</TopTitle>
      <div
        className={cn(
          'absolute inset-x-2 flex flex-col justify-start items-center gap-4 transition-all duration-1000',
          requestedResult ? 'top-14' : 'top-[calc(50%-2rem)]'
        )}
      >
        <SearchForm />
        {requestedResult ? (
          <SearchResult />
        ) : (
          <SearchError text={errorMessage} />
        )}
      </div>
    </main>
  )
}

export default PageSearch
