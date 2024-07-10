import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ClipboardCopy, SearchIcon } from 'lucide-react'
import { useAppDispatch } from '@/hooks/store-hook'
import { getDefinitions } from '@/store/reducers/searchSlice'

const formSchema = z.object({
  word: z.string().min(2).max(50),
})

const SearchForm = () => {
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inputValue = values.word.trim()
    await dispatch(getDefinitions(inputValue))
    form.reset()
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText()
    if (text) {
      onSubmit({ word: text })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        <FormField
          control={form.control}
          name='word'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center justify-between gap-2'>
                  <Input
                    type='text'
                    placeholder='Enter the word..'
                    {...field}
                    className='text-base h-10 flex-auto'
                  />
                  <Button
                    size='sm'
                    variant='outline'
                    type='button'
                    title='Paste from clipboard'
                    className='flex items-center justify-center h-10 px-2'
                    onClick={handlePaste}
                  >
                    <ClipboardCopy className='w-5 h-5 opacity-70' />
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    type='submit'
                    title='Search'
                    className='flex items-center justify-center h-10  px-6'
                  >
                    <SearchIcon className='w-5 h-5 opacity-70' />
                  </Button>
                </div>
              </FormControl>
              <FormMessage className='absolute left-0 text-xs top-9' />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SearchForm
