import { useAppSelector } from '@/hooks/store-hook'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/routes'
import { selectorUserAuthSlice } from '@/store/reducers/userAuthSlice'
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
  const { isAuth } = useAppSelector(selectorUserAuthSlice)

  return (
    <nav
      className={cn(
        'fixed bottom-4 left-4 right-4 p-1.5 rounded-full grid grid-cols-3 gap-1 bg-slate-300 dark:bg-slate-700 shadow',
      )}
    >
      {links.map(({ text, to, isPrivate }) => {
        return (
          <NavLink
            key={text}
            to={to}
            className={({ isActive }) =>
              cn(
                'h-10 text-base px-1 rounded-full flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:font-medium',
                isActive && 'bg-background font-medium shadow opacity-100',
                isPrivate && !isAuth && 'pointer-events-none opacity-40'
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
