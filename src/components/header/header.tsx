import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { Menu } from './menu'
import { useAppSelector } from '@/hooks/store-hook'
import { selectorUserAuthSlice } from '@/store/reducers/userAuthSlice'

const Header = () => {
  const { isAuth, user } = useAppSelector(selectorUserAuthSlice)

  return (
    <header className='absolute top-0 right-0 z-50 flex w-auto items-center justify-end pt-2 pr-2'>
      {isAuth && user ? (
        <Menu user={user} />
      ) : (
        <Link to='/login' className={buttonVariants({ variant: 'outline' })}>
          Login
        </Link>
      )}
    </header>
  )
}

export default Header
