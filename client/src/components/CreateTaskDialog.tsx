import React, { useState } from 'react'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import { StandardButton } from './StandardButton'
import { StandardInput } from './StandardInput'

interface Props {
  open: boolean
  handleClose: () => void
  handleSubmit: any
  input_title?: string
  input_todo?: string
  header?: string
}

export const CreateTaskDialog = (props: Props) => {
  const header = props.header || 'Create a new task'
  const [titleValue, setTitleValue] = useState<string>(props.input_title || '')
  const [todoValue, setTodoValue] = useState<string>(props.input_todo || '')

  const uploadTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.handleSubmit(titleValue, todoValue)
    props.handleClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        style: {
          maxHeight: '600px',
          height: '100%',
          maxWidth: '500px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '5px',
          border: '2px solid white',
          backgroundColor: 'black',
          color: 'white',
        },
      }}
    >
      <DialogTitle
        style={{
          fontFamily: "'Raleway', sans-serif",
          color: 'white',
          fontSize: '25px',
        }}
      >
        {header}
        <Box borderBottom={1} borderColor="grey.300" width="100%" />
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
        >
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <form id="taskform" onSubmit={uploadTask}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <StandardInput
              placeholderText="What is the task name?"
              label="Title"
              name="title"
              type="text"
              value={titleValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitleValue(e.target.value)
              }
            />
            <StandardInput
              placeholderText="What needs to be done?"
              label="Todo"
              name="todo"
              type="text"
              value={todoValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTodoValue(e.target.value)
              }
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <StandardButton form="taskform" text="Submit" />
      </DialogActions>
    </Dialog>
  )
}
