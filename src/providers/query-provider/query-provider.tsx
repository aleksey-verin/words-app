import { PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './query-client'

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
