import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
