import TopTitle from '@/components/ui/top-title'
import SearchForm from './search-form'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Word } from '@/data/types'
import SearchResult from './search-result'
import SearchError from './search-error'

const PageSearch = () => {
  const [word, setWord] = useState<string>('')
  const [result, setResult] = useState<Word | null>(null)
  return (
    <main className='relative h-full pt-3 px-2 flex flex-col gap-4 no-scrollbar overflow-y-auto'>
      <TopTitle>Search for the meaning</TopTitle>
      <div
        className={cn(
          'absolute inset-x-2 flex flex-col justify-start items-center gap-4 transition-all duration-1000',
          result ? 'top-14' : 'top-[calc(50%-2rem)]'
        )}
      >
        <SearchForm setWord={setWord} setResult={setResult} />
        {result ? (
          <SearchResult word={word} result={result} />
        ) : (
          <SearchError text={word} />
        )}
      </div>
    </main>
  )
}

export default PageSearch
