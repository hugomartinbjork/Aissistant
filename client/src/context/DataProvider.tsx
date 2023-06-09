import React, { ReactNode, createContext, useContext, useState } from 'react'
import { Task, Workspace } from '@/utils/Types'
import { getTasksByWorkspace, getWorkspaceById } from '@/utils/Functions'
import AuthContext from './AuthContext'

interface MyProviderProps {
  children: ReactNode
}

interface ContextProps {
  tasks: Task[][]
  setTasks: (ws_id: number) => void
  workspace: Workspace | null
  setWorkspace: (ws_id: number) => void
}

const MyContext = createContext<ContextProps>({
  tasks: [],
  setTasks: () => {},
  workspace: null,
  setWorkspace: () => {},
})

const DataProvider = ({ children }: MyProviderProps) => {
  const [tasks, setTasks] = useState<Task[][]>([])
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const { auth } = useContext(AuthContext)

  // Function to set tasks
  const handleSetTasks: ContextProps['setTasks'] = async (ws_id: number) => {
    const data = await getTasksByWorkspace(auth, ws_id)
    const taskMap: Task[][] = []
    if (workspace) {
      const nrOfStages = workspace.headings.length
      for (let i = 0; i < nrOfStages; i++) {
        taskMap[i] = []
      }
      data.map((task: Task) => {
        if (!taskMap[task.heading.order]) {
          taskMap[task.heading.order] = []
        }
        taskMap[task.heading.order].push(task)
      })
      setTasks(taskMap)
    }
  }

  // Function to set workspace
  const handleSetWorkspace: ContextProps['setWorkspace'] = async (
    ws_id: number
  ) => {
    const ws = await getWorkspaceById(auth, ws_id)
    setWorkspace(ws)
  }

  // Context value
  const contextValue: ContextProps = {
    tasks,
    setTasks: handleSetTasks,
    workspace,
    setWorkspace: handleSetWorkspace,
  }

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  )
}

export { MyContext, DataProvider }
