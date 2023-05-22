// MyContext.js
import React, { ReactNode, createContext, useState } from 'react'
import { Task, Workspace } from '@/utils/Types'

interface MyProviderProps {
  children: ReactNode
}

interface ContextProps {
  tasks: Task[][]
  setTasks: (tasks: Task[][]) => void
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace | null) => void
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

  // Function to set tasks
  const handleSetTasks = (newTasks: Task[][]) => {
    setTasks(newTasks)
  }

  // Function to set workspace
  const handleSetWorkspace = (newWorkspace: Workspace | null) => {
    setWorkspace(newWorkspace)
  }

  // Context value
  const contextValue = {
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
