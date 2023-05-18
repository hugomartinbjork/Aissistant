import React, { useState } from 'react'
import WritersBlock from '@/components/WritersBlock'
import withAuth from '@/context/WithAuth'

const index = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WritersBlock />
      </div>
    </>
  )
}

export default withAuth(index)
