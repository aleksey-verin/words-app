import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ROUTES } from '@/routes'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const isAuth = true

export function Menu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='border'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavLink to={ROUTES.SEARCH} className={({ isActive }) => isActive ? 'font-medium' : 'opacity-80'}>
          <DropdownMenuItem>Search for the meaning</DropdownMenuItem>
        </NavLink>
        <NavLink to={ROUTES.TRAINING} className={({ isActive }) => isActive ? 'font-medium' : 'opacity-80'}>
        <DropdownMenuItem disabled={!isAuth}>Training</DropdownMenuItem>
        </NavLink>
        <NavLink to={ROUTES.WORDS} className={({ isActive }) => isActive ? 'font-medium' : 'opacity-80'}>
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
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
