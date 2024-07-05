import { Menu } from './menu'

const Header = () => {
  return (
    <header className='absolute top-0 z-50 flex w-full items-center justify-end p-4'>
      <Menu />
    </header>
  )
}

export default Header
