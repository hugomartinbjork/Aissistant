import React, { useState } from 'react'
import Navbar from '@/components/Nav'
import WritersBlock from '@/components/WritersBlock'
import PdfDownloader from '@/components/PdfDownloader'
import { StandardButton } from '@/components/StandardButton'

const index = () => {
  // const [text, setText] = useState<string>('')
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()
  //   const prompt = e.target.text.value
  //   const body = JSON.stringify({ prompt })
  //   const res = await fetch('/api/openAIChat', {
  //     headers: { 'Content-Type': 'application/json' },
  //     method: 'POST',
  //     body,
  //   })
  //   const json = await res.json()
  //   console.log('Svaaaar', json.prompt)
  // }

  return (
    <>
      <Navbar title="DefaultIcon" />
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

export default index
