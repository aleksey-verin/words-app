import { Progress } from '@/components/ui/progress'
import { Word } from '@/data/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Volume2 } from 'lucide-react'

const SearchResult = ({ word, result }: { word: string; result: Word }) => {

  function handleSound() {
    const sound = result.phonetics.find((item) => item.audio ? item.audio : null)
    if (!sound) return
    if (sound.audio) {
      new Audio(sound.audio).play();
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
          {`${word}${result?.phonetic ? ` - ${result.phonetic}` : ''}`}
        </h4>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='w-8 h-8'
          onClick={handleSound}
        >
          <Volume2 className='w-5 h-5' />
        </Button>
      </div>
      <Progress value={25} className='h-1' />
      <div className='h-full w-full mb-20 flex flex-col gap-2'>
        {result.meanings.map((part, index) => {
          return (
            <div key={index} className='flex flex-col gap-2'>
              <div className='flex'>
                <Badge variant='secondary'>{part.partOfSpeech}</Badge>
              </div>
              {part.definitions.map((item, index) => (
                <div
                  key={index}
                  className='p-2 border rounded-lg flex flex-col gap-1'
                >
                  <div className=''>
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      className='float-right w-5 h-5 ml-2'
                    >
                      <Plus className='w-3 h-3' />
                    </Button>
                    <p>{item.definition}</p>
                  </div>
                  {item.example && (
                    <div className='border-t pt-1 text-sm opacity-60'>{`Example: ${item.example}`}</div>
                  )}
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
