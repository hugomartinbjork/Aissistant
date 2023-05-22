import React, { useState } from 'react'
import { CreateTaskDialog } from './CreateTaskDialog'
import { CreateStage } from './CreateStage'

interface Props {
  open: boolean
  ws_id: number
  handleUpdate: any
  handleClose: any
  handleSubmit: any
}

const Dropdown = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { open, ws_id, handleUpdate, handleClose, handleSubmit } = props
  const handleOptionChange = (e: any) => {
    console.log('poop: ', props)
    setSelectedOption(e.target.value)
    handleClose()
  }
  const handleChange = () => {
    handleClose()
    setSelectedOption('choice')
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
        <option value="modal3">Modal 3</option>
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
          handleUpdate={handleUpdate}
          handleClose={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {selectedOption === 'modal3' && <h1>Här ska modal 3 komma</h1>}
    </div>
  )
}

export default Dropdown
