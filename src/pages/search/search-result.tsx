import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Volume2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import {
  addInDictionary,
  removeDefinitionFormDictionary,
  selectorUserDictionarySlice,
} from '@/store/reducers/userDictionarySlice'
import { cn } from '@/lib/utils'
import { selectorSearchSlice } from '@/store/reducers/searchSlice'
import { selectorUserAuthSlice } from '@/store/reducers/userAuthSlice'
import { toast } from 'sonner'
import WarningLogin from '@/components/ui/warning-login'

const SearchResult = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(selectorUserAuthSlice)
  const { requestedWord, requestedResult } = useAppSelector(selectorSearchSlice)
  const { dictionary, isLoading } = useAppSelector(selectorUserDictionarySlice)

  function handleSound() {
    const sound = requestedResult?.phonetics.find((item) =>
      item.audio ? item.audio : null
    )
    if (!sound) return
    if (sound.audio) {
      new Audio(sound.audio).play()
    }
  }

  async function handleAddDefinition(word: string, definition: string) {
    if (isAuth) {
      await dispatch(addInDictionary({ word, definition }))
    } else {
      toast(<WarningLogin text='Please login to save words' />)
    }
  }

  async function handleRemoveDefinition(word: string, definition: string) {
    if (isAuth) {
      await dispatch(removeDefinitionFormDictionary({ word, definition }))
    } else {
      toast(<WarningLogin text='Please login to save words' />)
    }
  }

  const wordInDictionary = dictionary.find(
    (item) => item.word === requestedWord
  )
  const isWordInDictionary = wordInDictionary ? true : false

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='flex items-center justify-between flex-wrap gap-1'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
          {`${requestedWord}${
            requestedResult?.phonetic ? ` - ${requestedResult.phonetic}` : ''
          }`}
        </h4>
        <div className='flex items-center gap-1'>
          {isWordInDictionary && <Badge variant='outline'>Added</Badge>}
          <Button
            variant={'ghost'}
            size={'icon'}
            className='w-6 h-6'
            onClick={handleSound}
          >
            <Volume2 className='w-5 h-5' />
          </Button>
        </div>
      </div>
      {isWordInDictionary && (
        <Progress value={wordInDictionary?.progress} className='h-1' />
      )}
      <div className='h-full w-full mb-20 flex flex-col gap-2'>
        {requestedResult?.meanings.map((part, index) => {
          return (
            <div key={index} className='flex flex-col gap-2'>
              <div className='flex'>
                <Badge variant='default'>{part.partOfSpeech}</Badge>
              </div>
              {part.definitions.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-2 border rounded-lg flex flex-col gap-1',
                    isWordInDictionary &&
                      wordInDictionary?.definitions.includes(item.definition)
                      ? 'bg-slate-100 dark:bg-slate-900'
                      : ''
                  )}
                >
                  <div className=''>
                    {isWordInDictionary &&
                    wordInDictionary?.definitions.includes(item.definition) ? (
                      <Button
                        disabled={isLoading}
                        variant={'outline'}
                        size={'icon'}
                        className='float-right w-5 h-5 ml-2'
                        onClick={() =>
                          handleRemoveDefinition(requestedWord, item.definition)
                        }
                        title='Remove from dictionary'
                      >
                        <Minus className='w-3 h-3' />
                      </Button>
                    ) : (
                      <Button
                        disabled={isLoading}
                        variant={'outline'}
                        size={'icon'}
                        className='float-right w-5 h-5 ml-2'
                        onClick={() =>
                          handleAddDefinition(requestedWord, item.definition)
                        }
                        title='Add to dictionary'
                      >
                        <Plus className='w-3 h-3' />
                      </Button>
                    )}

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
