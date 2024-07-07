import TopTitle from '@/components/ui/top-title'
import SearchForm from './search-form'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const PageSearch = () => {
  const [isResult, setIsResult] = useState(false)
  return (
    <main className='relative h-full pt-3 px-2 flex flex-col gap-4 no-scrollbar overflow-y-auto'>
      <TopTitle>Search for the meaning</TopTitle>
      <div
        className={cn(
          'absolute inset-x-2 flex flex-col justify-start items-center gap-6 transition-all duration-1000',
          isResult ? 'top-14' : 'top-[calc(50%-2rem)]'
        )}
      >
          <SearchForm setIsResult={setIsResult} />
          {isResult && (
            <div className='h-full w-full mb-20'>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Similique amet architecto accusamus delectus illum aliquid
                ratione eum, voluptas, error repellat adipisci, obcaecati quis
                dolor aut eaque dolores eos temporibus aperiam praesentium
                expedita pariatur ex dolore.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Perferendis, asperiores dicta voluptatum odit nostrum eum enim
                sunt eos earum in consequuntur, nesciunt laboriosam ut. Dolorum
                fugit veritatis, magni nisi illo modi minus repellendus nemo
                officiis totam nihil veniam soluta, corrupti omnis quas quis non
                similique. Natus, voluptate unde. Repudiandae, repellendus!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ad voluptate ratione quaerat maiores velit excepturi
                laboriosam assumenda. Excepturi nihil, harum nemo magnam nam
                doloremque dolore ad pariatur cupiditate magni rem asperiores
                corporis praesentium! Quam sequi unde saepe earum? Mollitia
                tempore porro dolorum impedit eveniet cumque iusto dolorem at
                vitae exercitationem? Aut dolor repellendus blanditiis.
                Quisquam, eligendi earum. Iure id doloremque est molestias,
                doloribus eaque saepe explicabo necessitatibus neque officiis ex
                architecto ut laboriosam dolorem animi nemo nihil odio alias
                accusantium. Quidem assumenda modi laborum magni ratione sequi
                at quod dicta, non nobis est, ipsam, iste repellendus tenetur
                excepturi accusamus.
              </p>
            </div>
          )}
      </div>
    </main>
  )
}

export default PageSearch
