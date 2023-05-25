import React, { useState } from 'react'
import { CreateTaskDialog } from './CreateTaskDialog'
import { CreateStage } from './CreateStage'
import { useRouter } from 'next/router'

interface Props {
  open: boolean
  ws_id: number
  handleClose: any
  handleSubmit: any
}

const Dropdown = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { open, ws_id, handleClose, handleSubmit } = props
  const router = useRouter()
  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value)
    handleClose()
  }
  const handleChange = () => {
    handleClose()
    setSelectedOption('choice')
  }
  const handleChooseWorkspace = () => {
    console.log(12435)
    router.push('/board')
  }
  if (selectedOption === 'swithworkspace') {
    handleChooseWorkspace()
  }

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{
          padding: '20px',
          width: '16rem',
          border: '1px solid white',
          borderRadius: '4px',
          color: 'white',
          backgroundColor: 'black',
          fontSize: '18px',
          fontFamily: "'Raleway', sans-serif",
          textAlign: 'center',
          margin: '20px',
        }}
      >
        <option value="choose">Select an option</option>
        <option value="createtask">Create a new task</option>
        <option value="createstage">Create a new heading</option>
        <option value="swithworkspace">Switch Workspace</option>
      </select>
      {selectedOption === 'createtask' && (
        <CreateTaskDialog
          open={open}
          handleClose={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {selectedOption === 'createstage' && (
        <CreateStage
          open={open}
          ws_id={ws_id}
          handleClose={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default Dropdown
