import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TabsContainer = () => {
  return (
    <main className='flex h-full p-2'>
      <Tabs defaultValue='search' className='w-full h-full flex flex-col'>
        <TabsContent className='flex-auto' value='search'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent className='flex-auto' value='training'>
          Change your password here.
        </TabsContent>
        <TabsContent className='flex-auto' value='words'>
          Words Change your password here.
        </TabsContent>
        <TabsList className='grid w-full grid-cols-3 h-16 p-2 rounded-3xl'>
          <TabsTrigger
            className='h-12 text-base px-1 rounded-2xl'
            value='search'
          >
            Search
          </TabsTrigger>
          <TabsTrigger
            className='h-12 text-base px-1 rounded-2xl'
            value='training'
            disabled={false}
          >
            Training
          </TabsTrigger>
          <TabsTrigger
            className='h-12 text-base px-1 rounded-2xl'
            value='words'
            disabled={false}
          >
            Words
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  )
}

export default TabsContainer
