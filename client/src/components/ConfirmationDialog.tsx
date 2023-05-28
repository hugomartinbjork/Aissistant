import React, { useState } from 'react'
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import { StandardButton } from './StandardButton'

interface Props {
  open: boolean
  handleClose: any
  handleSubmit?: any
  input_title?: string
  input_todo?: string
  header?: string
}

export const ConfirmationDialog = (props: Props) => {
  const header = props.header || 'Confirm this action'

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        style: {
          maxHeight: '600px',
          maxWidth: '500px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '15px',
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
      <DialogActions>
        <StandardButton text="Cancel" onClick={() => props.handleClose()} />
        <StandardButton text="Confirm" onClick={() => props.handleSubmit()} />
      </DialogActions>
    </Dialog>
  )
}
