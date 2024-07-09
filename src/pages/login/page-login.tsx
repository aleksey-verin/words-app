import { Button } from '@/components/ui/button'
import TopTitle from '@/components/ui/top-title'
import { useLogInWithGoogle } from '@/queries/auth';

const PageLogin = () => {
  const {mutateAsync, isPending} = useLogInWithGoogle()

  const handleLogin = async () => {
    mutateAsync()
  };

  console.log(isPending);

  return (
    <main className='h-full pt-3 px-2 pb-16 flex flex-col gap-4'>
      <TopTitle>Login</TopTitle>
      <Button disabled={isPending} onClick={handleLogin}>Login</Button>
    </main>
  )
}

export default PageLogin
