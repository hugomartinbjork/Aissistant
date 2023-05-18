import React from 'react'
import { StandardInput } from './StandardInput'
import { StandardButton } from './StandardButton'
import Link from 'next/link'

interface Props {
  onSubmit?: any
}

export const LoginForm = (props: Props) => {
  return (
    <>
      <form
        onSubmit={props.onSubmit}
        style={{
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <StandardInput placeholderText="Email" type="text" name="email" />
        <StandardInput
          placeholderText="Password"
          type="password"
          name="password"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StandardButton text="Login" margin="10px" />
          <Link href="/signup">
            <StandardButton text="Signup" margin="10px" />
          </Link>
        </div>
      </form>
    </>
  )
}
