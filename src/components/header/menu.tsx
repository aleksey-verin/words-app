import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ROUTES } from '@/routes'
import { NavLink } from 'react-router-dom'
import { cn, getShortName } from '@/lib/utils'
import { useLogOut } from '@/queries/auth'
import { useCheckAuth } from '@/queries/auth'
import { UserData } from '@/api/auth/types'

export function Menu({ userInfo }: { userInfo: UserData }) {
  const { theme, setTheme } = useTheme()
  const {mutateAsync} = useLogOut()
  const {data} = useCheckAuth()
  const isAuth = data?.isAuth

  const { photoURL, displayName, email } = userInfo
  const userPhoto = photoURL ? photoURL : ''
  const userShortName = getShortName(displayName ?? '')

  const activeNavLinkStyle =
    'relative font-medium after:content-[""] after:absolute after:w-2 after:h-2 after:right-2 after:top-1/2 after:translate-y-[-50%] after:rounded-full after:bg-primary'

  const handleLogout = () => {
    mutateAsync()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='border'>
          <AvatarImage src={userPhoto} />
          <AvatarFallback>{userShortName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <div className='px-2 py-1.5 text-sm font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{displayName}</p>
            <p className='text-xs leading-none text-muted-foreground'>
            {email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <NavLink
          to={ROUTES.SEARCH}
          className={({ isActive }) =>
            isActive ? activeNavLinkStyle : 'opacity-80'
          }
        >
          <DropdownMenuItem>Search for the meaning</DropdownMenuItem>
        </NavLink>
        <NavLink
          to={ROUTES.TRAINING}
          className={({ isActive }) =>
            isActive ? activeNavLinkStyle : 'opacity-80'
          }
        >
          <DropdownMenuItem disabled={!isAuth}>Training</DropdownMenuItem>
        </NavLink>
        <NavLink
          to={ROUTES.WORDS}
          className={({ isActive }) =>
            isActive ? activeNavLinkStyle : 'opacity-80'
          }
        >
          <DropdownMenuItem disabled={!isAuth}>My words</DropdownMenuItem>
        </NavLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex flex-col gap-2'>
          <div className='flex w-full items-center'>
            Theme
            <Sun className='h-5 w-5 ml-2 dark:hidden' />
            <Moon className='h-5 w-5 ml-2 hidden dark:block ' />
          </div>
          <div className='flex w-full'>
            <ToggleGroup
              type='single'
              size='sm'
              value={theme}
              className={cn('w-full grid grid-cols-3')}
            >
              <ToggleGroupItem
                value='light'
                aria-label='Toggle light'
                onClick={() => setTheme('light')}
                className='font-normal data-[state=on]:bg-slate-300'
              >
                Light
              </ToggleGroupItem>
              <ToggleGroupItem
                value='dark'
                aria-label='Toggle dark'
                onClick={() => setTheme('dark')}
                className='font-normal data-[state=on]:bg-slate-700'
              >
                Dark
              </ToggleGroupItem>
              <ToggleGroupItem
                value='system'
                aria-label='Toggle system'
                onClick={() => setTheme('system')}
                className='font-normal data-[state=on]:bg-slate-300 dark:data-[state=on]:bg-slate-700'
              >
                System
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


{/* <Link to='/login' className={buttonVariants({ variant: 'outline' })}>
Login
</Link> */}