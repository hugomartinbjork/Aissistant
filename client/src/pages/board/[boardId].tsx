import styles from './styles.module.css'
import BoardStage from '@/components/BoardStage'
import { PostTask, Task, UpdateTask, Workspace } from '@/utils/Types'
import { useContext, useEffect, useState } from 'react'
import {
  createTask,
  getTask,
  getTasksByWorkspace,
  updateTask,
} from '@/utils/Functions'
import { useRouter } from 'next/router'
import withAuth from '@/context/WithAuth'
import AuthContext from '@/context/AuthContext'
import Dropdown from '@/components/Dropdown'
import { MyContext } from '@/context/DataProvider'

export default withAuth(function Board() {
  const { tasks, setTasks, workspace, setWorkspace } = useContext(MyContext)
  const [loading, setLoading] = useState<boolean>(true)
  const {
    query: { boardId },
  } = useRouter()
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleChange = () => {
    setOpenDialog(!openDialog)
  }

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

  const submitTask = async (title: string, todo: string, deadline?: Date) => {
    if (workspace) {
      const data: PostTask = {
        ws_id: workspace?.id,
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
    setTasks(workspace?.id as number)
  }
  useEffect(() => {
    setLoading(true)
    if (workspace) {
      setTasks(workspace.id)
    }
    setLoading(false)
  }, [workspace])
  useEffect(() => {
    if (boardId) {
      setWorkspace(parseInt(boardId as string))
    }
  }, [boardId])

  const handleOnDrop = async (e: React.DragEvent, targetStage: number) => {
    const taskId = parseInt(e.dataTransfer.getData('task') as string)
    const currentTask: Task = await fetchTask(taskId)
    if (currentTask && workspace && tasks) {
      await changeTask(currentTask.task_id, targetStage).then(() => {
        fetchWorkspaceTasks()
      })
    }
  }

  return (
    <>
      {workspace ? (
        <>
          <Dropdown
            open={openDialog}
            ws_id={workspace.id}
            handleClose={handleChange}
            handleSubmit={submitTask}
          />
          <div className={styles.outer}>
            <div className={styles.stageContainer}>
              {!loading &&
                workspace.headings
                  .sort((a, b) => a.order - b.order)
                  .map((heading) => (
                    <BoardStage
                      key={heading.order}
                      heading={heading}
                      tasks={tasks}
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
