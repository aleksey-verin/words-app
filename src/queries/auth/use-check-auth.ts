import { checkAuth } from '@/api/auth/auth'
import { QUERIES } from '@/constants'
import { useQuery } from '@tanstack/react-query'

export const useCheckAuth = () => {
  const fetchFn = async () => {
    try {
      const data = await checkAuth()
      return data
    } catch (error) {
      return Promise.reject(new Error('Oh no!'))
    }
  }

  return useQuery({
    queryKey: [QUERIES.CHECK_AUTH],
    queryFn: fetchFn,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
}

// export const useCheckAuth = (status_landing_page: boolean) => {
//   const { mutateAsync: loginRequest } = useLogIn()
//   const { mutateAsync: checkSession } = useSession()

//   const login = usePariLogin()

//   async function fetchFn() {
//     try {
//       if (!checkAuthCookies()) {
//         if (status_landing_page) {
//           return Promise.reject('no cookie')
//         } else {
//           try {
//             await login()
//           } catch (error) {
//             console.log(error)
//             return Promise.reject('no auth')
//           }
//         }
//       }
//       const isSession = await checkSession()
//       if (isSession) {
//         return true
//       } else {
//         const isLogin = await loginRequest()
//         if (isLogin) {
//           return true
//         } else {
//           clearCookies()
//           return Promise.reject('unauthorized')
//         }
//       }
//     } catch (error) {
//       if (error instanceof AxiosError && error?.response?.status === 401) {
//         clearCookies()
//         console.log(error)
//         return Promise.reject('unauthorized')
//       }
//       return Promise.reject('other error')
//     }
//   }

//   return useQuery({
//     queryKey: [QUERIES.CHECK_AUTH],
//     queryFn: fetchFn,
//     retry: 0,
//     staleTime: 5 * 60 * 1000,
//   })
// }
