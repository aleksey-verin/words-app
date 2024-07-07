import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

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
              className='w-full justify-between'
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
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
