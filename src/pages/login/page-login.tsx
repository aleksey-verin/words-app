import { Button } from '@/components/ui/button'
import TopTitle from '@/components/ui/top-title'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hook';
// import { useLogInWithGoogle } from '@/queries/auth';
import { selectorUserAuthSlice, userLoginWithGoogle } from '@/store/reducers/userAuthSlice';

const PageLogin = () => {
  const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(selectorUserAuthSlice)
  // const {mutateAsync, isPending} = useLogInWithGoogle()

  const handleLogin = async () => {
    dispatch(userLoginWithGoogle())

  };

  console.log(isLoading);

  return (
    <main className='h-full pt-3 px-2 pb-16 flex flex-col gap-4'>
      <TopTitle>Login</TopTitle>
      <Button disabled={isLoading} onClick={handleLogin}>Login</Button>
    </main>
  )
}

export default PageLogin
