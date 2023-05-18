import styles from './styles.module.css'
import { Workspace } from '@/utils/Types'
import { useEffect, useState } from 'react'
import { getWorkspacesByUser } from '@/utils/Functions'
import { useAuth } from '@/hooks/useAuth'
import ChooseWorkspace from '@/components/ChooseWorkspace'
import { useRouter } from 'next/router'

export default function ChooseBoard() {
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const { auth, user } = useAuth()

  const setCurrentWorkspace = (workspace: Workspace) => {
    router.push('board/' + workspace.id)
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
        <h1 className={styles.mainHeading}>Workboard</h1>
        <div className={styles.stageContainer}>
          <ChooseWorkspace
            onClick={setCurrentWorkspace}
            workspaces={workspaces}
          />
        </div>
      </div>
    </>
  )
}
