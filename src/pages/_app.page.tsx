import '#/styles/globals.css'

import type { AppProps } from 'next/app'

import { Providers } from '#/components/Providers'
import { Toaster } from '#/components/ui/sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster />
    </Providers>
  )
}
