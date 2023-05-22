import styles from './styles.module.css'
import BoardStage from '@/components/BoardStage'
import { PostTask, Task, UpdateTask, Workspace } from '@/utils/Types'
import { useContext, useEffect, useState } from 'react'
import {
  createTask,
  getTask,
  getTasksByWorkspace,
  getWorkspacesByUser,
  updateTask,
} from '@/utils/Functions'
import { useRouter } from 'next/router'
import withAuth from '@/context/WithAuth'
import AuthContext from '@/context/AuthContext'
import Dropdown from '@/components/Dropdown'

export default withAuth(function Board() {
  const [tasks, setTasks] = useState<Task[][]>([])
  const [update, setUpdate] = useState<boolean>(false)
  const {
    query: { boardId },
  } = useRouter()
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleChange = () => {
    setOpenDialog(!openDialog)
  }

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>()

  const { auth, user } = useContext(AuthContext)

  const handleOnDrag = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('task', taskId.toString())
  }

  const fetchTask = async (task_id: number) => {
    const data = await getTask(task_id)
    return data
  }
  const changeTask = async (task_id: number, order: number) => {
    const newData: UpdateTask = { task_id: task_id, order: order }
    await updateTask(newData)
  }

  const fetchWorkspaces = async (boardId: number) => {
    const data = (await getWorkspacesByUser(parseInt(user))) as Workspace[]
    const workspace = data.find((ws) => ws.id === boardId)
    setCurrentWorkspace(workspace)
    return data
  }

  const submitTask = async (title: string, todo: string, deadline?: Date) => {
    if (currentWorkspace) {
      const data: PostTask = {
        ws_id: currentWorkspace?.id,
        title: title,
        todo: todo,
        deadline,
      }
      await createTask(data)
      setOpenDialog(false)
      await fetchWorkspaceTasks()
    } else {
      setOpenDialog(false)
      return
    }
  }
  const fetchWorkspaceTasks = async () => {
    try {
      if (currentWorkspace) {
        const data = (await getTasksByWorkspace(currentWorkspace?.id)) as Task[]
        const taskMap: Task[][] = []
        const nrOfStages = currentWorkspace.headings.length
        for (let i = 0; i < nrOfStages; i++) {
          taskMap[i] = []
        }
        data.map((task) => {
          if (!taskMap[task.heading.order]) {
            taskMap[task.heading.order] = []
          }
          taskMap[task.heading.order].push(task)
        })
        setTasks(taskMap)
        return data
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user && boardId) {
      console.log({ boardId })
      fetchWorkspaces(parseInt(boardId as string))
    }
  }, [user, boardId])
  useEffect(() => {
    if (currentWorkspace) {
      fetchWorkspaceTasks()
    }
  }, [currentWorkspace, update])

  const handleOnDrop = async (e: React.DragEvent, targetStage: number) => {
    const taskId = parseInt(e.dataTransfer.getData('task') as string)
    const currentTask: Task = await fetchTask(taskId)

    if (currentTask && currentWorkspace && tasks) {
      await changeTask(currentTask.task_id, targetStage).then(() => {
        fetchWorkspaceTasks()
      })
    }
  }

  return (
    <>
      {currentWorkspace ? (
        <>
          <Dropdown
            open={openDialog}
            ws_id={currentWorkspace.id}
            handleClose={handleChange}
            handleUpdate={setUpdate}
            handleSubmit={submitTask}
          />
          <div className={styles.outer}>
            <h1 className={styles.mainHeading}>Workboard</h1>
            <div className={styles.stageContainer}>
              {currentWorkspace.headings
                .sort((a, b) => a.order - b.order)
                .map((heading) => (
                  <BoardStage
                    key={heading.order}
                    heading={heading}
                    tasks={tasks}
                    setTasks={setTasks}
                    addButton={heading.order === 0 ? true : false}
                    onAddClick={heading.order === 0 ? setOpenDialog : null}
                    handleOnDrag={handleOnDrag}
                    handleOnDrop={(e: any) => handleOnDrop(e, heading.order)}
                  />
                ))}
            </div>
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
})
