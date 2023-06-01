import styles from './styles.module.css'
import { Workspace } from '@/utils/Types'
import { useContext, useEffect, useState } from 'react'
import { createWorkspace, getWorkspacesByUser } from '@/utils/Functions'
import ChooseWorkspace from '@/components/ChooseWorkspace'
import { useRouter } from 'next/router'
import WithAuth from '@/context/WithAuth'
import AuthContext from '@/context/AuthContext'
import { StandardButton } from '@/components/StandardButton'
import { StandardInput } from '@/components/StandardInput'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default WithAuth(function ChooseBoard() {
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const { auth, user } = useContext(AuthContext)

  const setCurrentWorkspace = (workspace: Workspace) => {
    router.push('board/' + workspace.id)
  }
  const handleCreateWorkspace = async (e: any) => {
    e.preventDefault()
    if (open && e.target.workspace.value !== '') {
      const new_ws = await createWorkspace({
        user_id: user as number,
        name: e.target.workspace.value,
      })
      router.push('board/' + new_ws.id)
    } else {
      setOpen(true)
    }
  }

  const fetchWorkspaces = async () => {
    const data = (await getWorkspacesByUser(parseInt(user))) as Workspace[]
    setWorkspaces(data)
    return data
  }
  useEffect(() => {
    if (user) {
      fetchWorkspaces()
    }
  }, [user])

  return (
    <>
      <div className={styles.outer}>
        <div style={{ display: 'flex', flex: 2, justifyContent: 'center' }}>
          <h1 className={styles.mainHeading}>Workboard</h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ChooseWorkspace
            onClick={setCurrentWorkspace}
            workspaces={workspaces}
          />
          <form
            id="workform"
            onSubmit={handleCreateWorkspace}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {open && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <StandardInput
                  placeholderText="Workspace name"
                  label="Name your new workspace"
                  name="workspace"
                  type="text"
                  margin="10px"
                />
                <div onClick={() => setOpen(!open)}>
                  <DeleteOutlineIcon style={{ marginTop: 15, color: 'red' }} />
                </div>
              </div>
            )}
            <StandardButton
              padding="20px"
              fontSize="18px"
              text="Create a new workspace"
              margin="35px"
              borderColor={open ? 'green' : 'white'}
              form="workform"
              minWidth="15rem"
            />
          </form>
        </div>
      </div>
    </>
  )
})
