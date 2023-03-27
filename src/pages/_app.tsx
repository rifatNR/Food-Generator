import BaseProvider from '@/context/BaseContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='bg-gray-50'>
      <BaseProvider>
        <Component {...pageProps} />
      </BaseProvider>
    </div>
  )
}
