import { cn } from '@/lib/utils'
import { ROUTES } from '@/routes'
import { NavLink } from 'react-router-dom'

const links = [
  {
    text: 'Search',
    to: ROUTES.SEARCH,
    isPrivate: false,
  },
  {
    text: 'Training',
    to: ROUTES.TRAINING,
    isPrivate: true,
  },
  {
    text: 'Words',
    to: ROUTES.WORDS,
    isPrivate: true,
  },
]

const Navbar = () => {
  const isAuth = true

  return (
    <nav
      className={cn(
        'absolute bottom-1 left-1 right-1 h-16 p-2 rounded-3xl grid grid-cols-3 gap-2 bg-muted shadow'
      )}
    >
      {links.map(({ text, to, isPrivate }) => {
        return (
          <NavLink
            key={text}
            to={to}
            className={({ isActive }) =>
              cn(
                'h-12 text-base px-1 rounded-2xl flex items-center justify-center transition-all duration-300 hover:font-medium',
                isActive && 'bg-background rounded-2xl font-medium shadow',
                isPrivate && !isAuth && 'text-slate-400 pointer-events-none'
              )
            }
          >
            {text}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default Navbar
