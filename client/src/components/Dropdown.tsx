import React, { useContext, useState } from 'react'
import { CreateTaskDialog } from './CreateTaskDialog'
import { CreateStage } from './CreateStage'
import { useRouter } from 'next/router'
import { updateWorkspaceL } from '@/utils/Functions'
import { ConfirmationDialog } from './ConfirmationDialog'
import AuthContext from '@/context/AuthContext'
import { InviteDialog } from './InviteDialog'
import { MyContext } from '@/context/DataProvider'
import { WorkspacePutL } from '@/utils/Types'

interface Props {
  open: boolean
  ws_id: number
  handleClose: any
  handleSubmit: any
}

const Dropdown = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { workspace } = useContext(MyContext)
  const { auth, user } = useContext(AuthContext)
  const { open, ws_id, handleClose, handleSubmit } = props
  const action = workspace && workspace?.users.length > 1 ? 'Leave' : 'Delete'
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
    router.push('/board')
  }
  if (selectedOption === 'swithworkspace') {
    handleChooseWorkspace()
  }
  const leaveWs = async (user_id: number) => {
    if (workspace) {
      const workspacePutData: WorkspacePutL = {
        user_id: user_id,
        ws_id: workspace?.id,
      }
      await updateWorkspaceL(auth, workspacePutData)
      router.push('/board')
    }
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
          margin: '25px',
        }}
      >
        <option value="choose">Select an option</option>
        <option value="swithworkspace">Switch Workspace</option>
        <option value="createtask">Create a new task</option>
        <option value="createstage">Create a new heading</option>
        <option value="member">Invite new member</option>
        <option value="leave/delete">{action} this workspace</option>
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
      {selectedOption === 'member' && (
        <InviteDialog open={open} handleClose={handleChange} />
      )}
      {selectedOption === 'leave/delete' && (
        <ConfirmationDialog
          open={open}
          handleClose={handleChange}
          handleSubmit={() => leaveWs(user)}
          header={'Do you want to ' + action + ' this workspace?'}
        />
      )}
    </div>
  )
}

export default Dropdown
