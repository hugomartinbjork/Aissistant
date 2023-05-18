import { createContext, useState } from 'react'
import { useRouter } from 'next/router'

export const getAuth = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('auth') ?? ''
  }
  return ''
}
export const getAuthUser = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('user') ?? ''
  }
  return ''
}

const AuthContext = createContext<any>(null)

export default AuthContext

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<string>(getAuth())
  const [user, setUser] = useState<number>(parseInt(getAuthUser()))
  const router = useRouter()

  const loginUser = async (e: any) => {
    e.preventDefault()
    try {
      const resp = await fetch('http://127.0.0.1:8000/aisistant/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      })
      const data = await resp.json()
      const accessToken = data.token
      const userId = data.user.id
      setAuth(accessToken)
      setUser(userId)

      sessionStorage.setItem('auth', accessToken)
      sessionStorage.setItem('user', userId)
      router.push('/').then(() => window.location.reload())
    } catch (err) {
      console.log(err)
      alert('Could not find user')
    }
  }

  const contextData = {
    loginUser: loginUser,
    auth: auth,
    user: user,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
