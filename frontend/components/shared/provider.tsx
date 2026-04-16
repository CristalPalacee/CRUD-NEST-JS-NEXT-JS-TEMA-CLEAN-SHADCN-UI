'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  { useState } from 'react'

const Provider = ({children}: {children: React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          staleTime: 0,
        },
      },
    }));
  return (
    <div>
      <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </div>
  )
}

export default Provider
