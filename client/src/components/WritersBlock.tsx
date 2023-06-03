import { useEffect, useState } from 'react'
import { StandardButton } from './StandardButton'
import { reWrite } from '@/utils/Functions'
import PdfDownloader from '@/components/PdfDownloader'
import Email from './Email'
import { StandardInput } from './StandardInput'

interface Props {
  storedText?: string
  storedSubject?: string
  isTask?: boolean
  handleSaveToTask?: any
}

const WritersBlock = (props: Props) => {
  const [text, setText] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [selected, setSelected] = useState<string>('')
  const [writer, setWriter] = useState<boolean>(false)

  useEffect(() => {
    if (props.storedSubject) {
      setSubject(props.storedSubject)
    }
    if (props.storedText) {
      setText(props.storedText)
    }
  }, [props.storedSubject, props.storedText])

  const handleSelectionChange = () => {
    const selection = window.getSelection()
    if (selection) {
      const selectedText = selection.toString()
      if (selectedText) {
        setWriter(true)
        setSelected(selectedText)
      }
    }
  }
  const handleRewrite = async () => {
    const newText = await reWrite(selected)
    setText((prevText) =>
      prevText.replace(selected, newText.replace(/\s+/g, ' ').trim())
    )
    setWriter(false)
  }

  return (
    <div
      style={{
        borderRadius: '10px',
        border: 'Solid',
        padding: '10px',
      }}
    >
      <h3 style={{ textAlign: 'center' }}> The writing machine</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <StandardInput
            placeholderText="Title/Subject"
            name="email"
            value={subject}
            onChange={(e: any) => setSubject(e.target.value)}
          />
          {props.isTask && (
            <div
              style={{
                maxWidth: '192px',
                maxHeight: '57.5px',
                justifyContent: 'center',
              }}
            >
              <StandardButton
                text="Save to task"
                onClick={() => props.handleSaveToTask(subject, text)}
              />
            </div>
          )}
        </div>

        <textarea
          style={{ width: '800px', height: '400px' }}
          placeholder="If you want to reformulate something, just select the text and hit
        rewrite."
          name="text"
          onMouseDown={() => setWriter(false)}
          onSelect={handleSelectionChange}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin: '20px',
          }}
        >
          {writer ? (
            <StandardButton text="Rewrite" onClick={handleRewrite} />
          ) : null}
          <PdfDownloader text={text} title={subject.split(' ').join('')} />
          <Email subject={subject} body={text} />
        </div>
      </div>
    </div>
  )
}

export default WritersBlock
