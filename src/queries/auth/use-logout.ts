import { logOut } from '@/api/auth/auth'
import { QUERIES } from '@/constants'
import { queryClient } from '@/providers/query-provider'
import { useMutation } from '@tanstack/react-query'

export const useLogOut = () => {
  const fetchFn = async () => {
    try {
      await logOut()
      return Promise.resolve(true)
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
