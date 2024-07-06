import SearchForm from './search-form'

const PageSearch = () => {
  return (
    <main className='h-full pt-3 px-2 pb-16 flex flex-col'>
      <div className='w-9/12 mb-2'>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      Search for the meaning
    </h3>
        {/* <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
          Search for the meaning of a word
        </h2> */}
      </div>
      <div className='h-full flex items-center'>
      <SearchForm />

      </div>
    </main>
  )
}

export default PageSearch
