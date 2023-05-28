import { Workspace } from '@/utils/Types'
import React, { useState } from 'react'

interface Props {
  workspaces: Workspace[]
  onClick?: any
}

const ChooseWorkspace = (props: Props) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>()

  const handleWorkspaceChange = (workspace: any) => {
    setSelectedWorkspace(workspace)
    props.onClick(workspace)
  }

  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      <select
        value={selectedWorkspace?.id}
        onChange={(e) =>
          handleWorkspaceChange(
            props.workspaces.find((ws) => ws.id === parseInt(e.target.value))
          )
        }
        style={{
          padding: '30px',
          width: '15rem',
          border: '1px solid white',
          borderRadius: '10px',
          color: 'white',
          backgroundColor: 'black',
          fontSize: '18px',
          fontFamily: "'Raleway', sans-serif",
          textAlign: 'center',
        }}
      >
        <option value="">Choose workspace</option>
        {props.workspaces.map((ws: any) => (
          <option key={ws.id} value={ws.id}>
            {ws.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChooseWorkspace
