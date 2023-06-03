import React, { useContext, useState, useEffect } from 'react'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import { StandardButton } from './StandardButton'
import { StandardInput } from './StandardInput'
import { MyContext } from '@/context/DataProvider'
import {
  getUsers,
  getWorkspacesUsers,
  updateWorkspaceA,
} from '@/utils/Functions'
import { MiniUser } from '@/utils/Types'
import AuthContext from '@/context/AuthContext'

interface Props {
  open: boolean
  ws_id?: number
  handleClose: () => void
  handleSubmit?: any
  header?: string
}

export const InviteDialog = (props: Props) => {
  const { workspace, setWorkspace } = useContext(MyContext)
  const { auth } = useContext(AuthContext)
  const [users, setUsers] = useState<MiniUser[]>([])
  const [wsUsers, setWsUsers] = useState<MiniUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<MiniUser[]>([])
  const [searchValue, setSearchValue] = useState('')

  const header = props.header || 'Invite a new member'

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(auth as string)
      setUsers(response)
    }
    fetchUsers()
    const fetchWorkspaceUsers = async () => {
      if (workspace) {
        const response = await getWorkspacesUsers(auth, workspace?.id)
        setWsUsers(response)
      }
    }
    fetchWorkspaceUsers()
  }, [])

  useEffect(() => {
    const filterUsers = () => {
      const filtered = users.filter((user: MiniUser) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
    filterUsers()
  }, [searchValue, users, wsUsers])

  const addUser = async (user_id: number) => {
    if (workspace) {
      await updateWorkspaceA(auth, { user_id, ws_id: workspace.id })
      setWorkspace(workspace.id)
      const updatedUsers = await getWorkspacesUsers(auth, workspace.id)
      setWsUsers(updatedUsers)
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
        <form id="membersform" onSubmit={() => props.handleClose()}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <StandardInput
              placeholderText="Search for users"
              label="Search"
              name="search"
              type="text"
              value={searchValue}
              onChange={(event: any) => setSearchValue(event.target.value)}
            />
          </div>
        </form>
        <List style={{}}>
          {filteredUsers.map((user: MiniUser) => (
            <ListItem
              key={user.id}
              style={{
                borderBottom: '1px solid white',
              }}
            >
              <ListItemText primary={user.name} style={{ margin: '15px' }} />
              {!wsUsers.some((wsUser) => wsUser.id === user.id) && (
                <StandardButton
                  text="Add"
                  minWidth="3px"
                  padding="8px"
                  fontSize="13px"
                  margin="15px"
                  onClick={() => addUser(user.id)}
                />
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <StandardButton form="membersform" text="Done" />
      </DialogActions>
    </Dialog>
  )
}
