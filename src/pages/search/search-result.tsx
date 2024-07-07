import { Progress } from '@/components/ui/progress'
import { Word } from '@/data/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const SearchResult = ({ word, result }: { word: string; result: Word }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
        {`${word}${result?.phonetic ? ` - ${result.phonetic}` : ''}`}
      </h4>
      <Progress value={25} className='h-1' />
      <div className='h-full w-full mb-20 flex flex-col gap-2'>
        {result.meanings.map((part, index) => {
          return (
            <div key={index} className='flex flex-col gap-2'>
              <div className='flex'>
                <Badge variant='secondary'>{part.partOfSpeech}</Badge>
              </div>
              {part.definitions.map((item, index) => (
                <div key={index} className='p-2 border rounded-lg flex flex-col gap-1'>
                  <div className=''>
                    <Button variant={'outline'} size={'icon'} className='float-right w-5 h-5'>
                      <Plus className='w-3 h-3' />
                    </Button>
                    <p>{item.definition}</p>
                  </div>
                  {item.example && <div className='border-t pt-1 text-sm opacity-60'>{`Example: ${item.example}`}</div>}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
    
  )
}

export default SearchResult
