import { Button } from '@/components/ui/button'
import TopTitle from '@/components/ui/top-title'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook'
import { selectorUserAuthSlice, userAuthLogin } from '@/store/reducers/userAuthSlice'

const PageLogin = () => {
  const dispatch = useAppDispatch()
  const {isLoading, isAuth, user} = useAppSelector(selectorUserAuthSlice)

  const handleLogin = async () => {
    dispatch(userAuthLogin());
  };

  console.log(isLoading, isAuth, user);

  return (
    <main className='h-full pt-3 px-2 pb-16 flex flex-col gap-4'>
      <TopTitle>Login</TopTitle>
      <Button disabled={isLoading} onClick={handleLogin}>Login</Button>
    </main>
  )
}

export default PageLogin
