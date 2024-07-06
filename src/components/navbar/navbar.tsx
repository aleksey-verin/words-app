import { cn } from '@/lib/utils'
import { ROUTES } from '@/routes'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const activeStyle =
    'h-12 text-base px-1 rounded-2xl flex items-center justify-center z-10 bg-white rounded-2xl font-medium shadow'
  const notActiveStyle =
    'h-12 text-base px-1 rounded-2xl flex items-center justify-center z-10 transition-all duration-300 hover:font-medium'

  return (
    <nav
      className={cn(
        'absolute bottom-1 left-1 right-1 h-16 p-2 rounded-3xl grid grid-cols-3 bg-slate-300 shadow'
      )}
    >
      <NavLink
        to={ROUTES.SEARCH}
        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
      >
        Search
      </NavLink>
      <NavLink
        to={ROUTES.TRAINING}
        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
      >
        Training
      </NavLink>
      <NavLink
        to={ROUTES.WORDS}
        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
      >
        Words
      </NavLink>
    </nav>
  )
}

export default Navbar
