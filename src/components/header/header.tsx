import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { Menu } from './menu'
// import { useAppSelector } from '@/hooks/store-hook'
// import { selectorUserAuthSlice } from '@/store/reducers/userAuthSlice'
import { useCheckAuth } from '@/queries/auth'
import { Skeleton } from '../ui/skeleton'

const Header = () => {
  // const { isAuth, user } = useAppSelector(selectorUserAuthSlice)
  const { data, isLoading } = useCheckAuth()
  const isAuth = data?.isAuth
  const userInfo = data?.user

  if (isLoading)
    return (
      <header className='absolute top-0 right-0 z-50 flex w-auto items-center justify-end pt-2 pr-2'>
        <Skeleton className='w-10 h-10 rounded-full border' />
      </header>
    )

  return (
    <header className='absolute top-0 right-0 z-50 flex w-auto items-center justify-end pt-2 pr-2'>
      {isAuth && userInfo ? (
        <Menu userInfo={userInfo} />
      ) : (
        <Link to='/login' className={buttonVariants({ variant: 'outline' })}>
          Login
        </Link>
      )}
    </header>
  )
}

export default Header
