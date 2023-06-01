import { useRouter } from 'next/router'
import { useEffect, useContext, useState } from 'react'
import AuthContext from './AuthContext'

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { auth } = useContext(AuthContext)
    const router = useRouter()
    const [authClient, setAuthClient] = useState('')
    // Check if the user is authenticated
    useEffect(() => {
      if (!auth) {
        router.push('/login') // Redirect to login page if not logged in
      }
    }, [auth, router])
    useEffect(() => {
      setAuthClient(auth)
    }, [authClient, router])

    // Render the component only if the user is authenticated7
    return authClient ? <WrappedComponent {...props} /> : null
  }
}

export default withAuth
