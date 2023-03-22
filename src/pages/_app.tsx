import BaseProvider from '@/context/BaseContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseProvider>
        <Component {...pageProps} />
      </BaseProvider>
    </>
  )
}
