import { logInWithGoogle } from '@/api/auth/auth'
import { QUERIES } from '@/constants'
import { queryClient } from '@/providers/query-provider'
import { useMutation } from '@tanstack/react-query'

export const useLogInWithGoogle = () => {
  const fetchFn = async () => {
    try {
      const response = await logInWithGoogle()
      if (response) {
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('Login failed (no response)'))
      }
    } catch (error) {
      return Promise.reject(new Error('Login failed (other error)'))
    }
  }

  return useMutation({
    mutationKey: [QUERIES.LOGIN],
    mutationFn: fetchFn,
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERIES.CHECK_AUTH] }),
  })
}
