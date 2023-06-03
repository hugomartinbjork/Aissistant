import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { DataProvider } from '@/context/DataProvider'
import Navbar from '@/components/Nav'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Navbar />
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  )
}
