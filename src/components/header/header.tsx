import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { Menu } from './menu'

const Header = () => {
  const isAuth = true
  return (
    <header className='absolute top-0 right-0 z-50 flex w-auto items-center justify-end pt-2 pr-2'>
      {isAuth ? (
        <Menu />
      ) : (
        <Link to='/login' className={buttonVariants({ variant: "outline" })}>Login</Link>
      )}
    </header>
  )
}

export default Header
