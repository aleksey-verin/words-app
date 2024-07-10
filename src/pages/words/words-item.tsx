import { SingleWord } from '@/api/dictionary/types'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAppDispatch } from '@/hooks/store-hook'
import { ROUTES } from '@/routes'
import { getDefinitions } from '@/store/reducers/searchSlice'
import { removeWordFormDictionary } from '@/store/reducers/userDictionarySlice'
import { Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const WordsItem = ({ word }: { word: SingleWord }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleRemoveWord = () => {
    dispatch(removeWordFormDictionary(word.word))
  }

  const handleEditWord = async () => {
    await dispatch(getDefinitions(word.word))
    navigate(ROUTES.SEARCH)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-2'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight flex-auto'>
          {word.word}
        </h4>
        <div className='flex gap-3'>
          <Button
            variant={'ghost'}
            size={'icon'}
            className='w-6 h-6'
            title='Edit'
            onClick={handleEditWord}
          >
            <Pencil className='w-5 h-5' />
          </Button>
          <Button
            variant={'ghost'}
            size={'icon'}
            className='w-6 h-6'
            title='Delete'
            onClick={handleRemoveWord}
          >
            <Trash2 className='w-5 h-5' />
          </Button>
        </div>
      </div>
      <Progress value={word.progress} className='h-1' />
      <div className='w-full flex flex-col gap-2'>
        {word.definitions.map((item, index) => (
          <div
            key={index}
            className='p-2 border rounded-lg flex flex-col gap-1'
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WordsItem
