import React from 'react'
import Navbar from '@/components/Nav'
import { StandardInput } from '@/components/StandardInput'

const index = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const prompt = e.target.text.value
    const body = JSON.stringify({ prompt })
    const res = await fetch('/api/openAIChat', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body,
    })
    const json = await res.json()
    console.log('Svar', json.prompt)
  }
  return (
    <>
      <Navbar title="DefaultIcon" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          <h3 style={{ textAlign: 'center' }}>AMA</h3>
          <StandardInput placeholderText="AMA" type="text" name="text" />
        </form>
      </div>
    </>
  )
}

export default index
