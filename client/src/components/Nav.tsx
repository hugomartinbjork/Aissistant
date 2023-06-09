import Link from 'next/link'
import Image from 'next/image'
import logo from '../assets/loggo2.png'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/hooks/logout'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { auth } = useAuth()
  const [lastBoard, setLastBoard] = useState<string>('')

  const { asPath } = useRouter()

  useEffect(() => {
    if (asPath === '/board') {
      setLastBoard('')
    }
    if (asPath.startsWith('/board/')) {
      setLastBoard(asPath)
    }
  }, [asPath])

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link href="/" className="navlink">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={35}
              style={{ paddingTop: '25%' }}
            />
          </Link>
        </div>
        {auth ? (
          <div className="logo">
            <Link href="/writer" className="navlink">
              Workbench
            </Link>
            <Link href={lastBoard ? lastBoard : '/board'} className="navlink">
              Board
            </Link>
            <Link href="/about" className="navlink">
              About
            </Link>
            <Link href="/" className="navlink" onClick={logout}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="logo">
            <Link href="/about" className="navlink">
              About
            </Link>
            <Link href="/login" className="navlink" passHref>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
