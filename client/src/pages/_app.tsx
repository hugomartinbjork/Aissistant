import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Nav'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar title="DefaultIcon" />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
