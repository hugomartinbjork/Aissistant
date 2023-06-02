import React, { useContext } from 'react'
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
import { createStage } from '@/utils/Functions'
import { MyContext } from '@/context/DataProvider'
import AuthContext from '@/context/AuthContext'

interface Props {
  open: boolean
  ws_id: number
  handleClose: any
  handleSubmit: any
}

export const CreateStage = (props: Props) => {
  const { setWorkspace } = useContext(MyContext)
  const { auth } = useContext(AuthContext)
  const uploadStage = async (e: any) => {
    e.preventDefault()
    const text = e.target.heading.value
    const order = e.target.order.value
    const ws_id = props.ws_id
    await createStage(auth, { ws_id, text, order })
    setWorkspace(ws_id)
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
        Create a new heading
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
        <form id="stageform" onSubmit={uploadStage}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <StandardInput
              placeholderText="What is the headings name?"
              label="Heading"
              name="heading"
              type="text"
            />
            <StandardInput
              placeholderText="What step should it be?"
              label="Order"
              name="order"
              type="number"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <StandardButton form="stageform" text="Submit" />
      </DialogActions>
    </Dialog>
  )
}
