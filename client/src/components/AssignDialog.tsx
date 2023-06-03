import React, { useContext, useEffect, useState } from 'react'
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
import { MiniUser, Task } from '@/utils/Types'
import { MyContext } from '@/context/DataProvider'
import { getWorkspacesUsers } from '@/utils/Functions'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AuthContext from '@/context/AuthContext'

interface Props {
  open: boolean
  handleClose: () => void
  handleSubmit: (user_ids: string) => Promise<void>
  handleReset: (task_id: number) => Promise<void>
  task: Task
  confirmAssign: boolean
  confirmClear: boolean
}

export const AssignDialog = (props: Props) => {
  const { workspace } = useContext(MyContext)
  const { auth } = useContext(AuthContext)
  const [users, setUsers] = useState<MiniUser[]>([])
  const [assignedUsers, setAssignedUsers] = useState<MiniUser[]>([])

  const fetchUsers = async () => {
    if (workspace) {
      const data = await getWorkspacesUsers(auth, workspace.id)
      const list = data as MiniUser[]
      setUsers([...data])
      const current = list.filter((user) =>
        props.task.assigned?.includes(user.id)
      )
      if (current) {
        setAssignedUsers([...current])
      }
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [props.task])

  const handleSubmit = async () => {
    let str: string = ''
    if (assignedUsers && assignedUsers.length > 0) {
      const userIds: string[] = assignedUsers.map((user) => user.id.toString())
      str = userIds.join(',')
      await props.handleSubmit(str)
    } else {
      handleReset()
    }
  }
  const handleReset = async () => {
    await props.handleReset(props.task.task_id)
  }

  const handleAssignClick = (u: MiniUser) => {
    if (assignedUsers && assignedUsers.some((user) => user.id === u.id)) {
      const updatedAssignedUsers = assignedUsers.filter(
        (user) => user.id !== u.id
      )
      setAssignedUsers(updatedAssignedUsers)
    } else {
      setAssignedUsers([...assignedUsers, u])
    }
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
        Choose user to assign
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
        {props.confirmAssign ? (
          <>
            <h1>Users Assigned!</h1>
          </>
        ) : (
          <>
            {props.confirmClear ? (
              <>
                <h1>Task Cleared!</h1>
              </>
            ) : (
              <>
                {' '}
                {users &&
                  users.length > 0 &&
                  users.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '50%',
                        alignItems: 'center',
                      }}
                      onClick={() => handleAssignClick(user)}
                    >
                      <p
                        style={{
                          fontSize: '16px',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          marginRight: '12px',
                        }}
                        key={user.id}
                      >
                        {user.name}
                      </p>
                      {assignedUsers &&
                      assignedUsers.some((u) => u.id === user.id) ? (
                        <>
                          <CheckCircleOutlineIcon
                            style={{ color: 'aqua', marginLeft: '12px' }}
                          />
                        </>
                      ) : (
                        <>
                          <CheckCircleOutlineIcon
                            style={{ marginLeft: '12px', opacity: '0.5' }}
                          />
                        </>
                      )}
                    </div>
                  ))}
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <StandardButton text="Done" onClick={() => handleSubmit()} />
      </DialogActions>
    </Dialog>
  )
}
