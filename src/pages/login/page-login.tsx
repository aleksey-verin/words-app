import { Button } from '@/components/ui/button'
import TopTitle from '@/components/ui/top-title'
import TypographyH2 from '@/components/ui/typography/typography-h2'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import {
  selectorUserAuthSlice,
  userLoginWithGoogle,
} from '@/store/reducers/userAuthSlice'
import IconGoogle from '@/components/ui/icons/icon-google'

const PageLogin = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectorUserAuthSlice)

  const handleLogin = async () => {
    dispatch(userLoginWithGoogle())
  }

  return (
    <main className='h-full pt-3 px-2 pb-16 flex flex-col gap-4'>
      <TopTitle>Login</TopTitle>
      <div className='flex-auto flex flex-col items-center justify-center gap-4'>
        <TypographyH2>Sign in to your account:</TypographyH2>
        <Button disabled={isLoading} onClick={handleLogin} variant={'outline'} className='flex items-center justify-center gap-3'>
          <IconGoogle className='w-6 h-6' />Sign in with Google
        </Button>
      </div>
    </main>
  )
}

export default PageLogin
