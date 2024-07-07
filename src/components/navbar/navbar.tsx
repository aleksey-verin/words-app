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
        'fixed bottom-2 left-2 right-2 p-2 rounded-xl grid grid-cols-3 gap-2 bg-muted shadow-lg'
      )}
    >
      {links.map(({ text, to, isPrivate }) => {
        return (
          <NavLink
            key={text}
            to={to}
            className={({ isActive }) =>
              cn(
                'h-10 text-base px-1 rounded-md flex items-center justify-center transition-all duration-300 hover:font-medium',
                isActive && 'bg-background font-medium shadow',
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
