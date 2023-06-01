import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import AuthContext from './AuthContext'

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
    const { auth } = useContext(AuthContext)
    const router = useRouter()
    const [authClient, setAuthClient] = useState('')

    useEffect(() => {
      if (!auth) {
        router.push('/login')
      }
    }, [auth, router])

    useEffect(() => {
      setAuthClient(auth)
    }, [auth])

    return authClient ? <WrappedComponent {...props} /> : null
  }

  WithAuthComponent.displayName = 'WithAuth'

  return WithAuthComponent
}

export default WithAuth
