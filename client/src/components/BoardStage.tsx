import React, { useContext, useState } from 'react'
import TaskCard from './TaskCard'
import { Heading, Task } from '@/utils/Types'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { deleteStage } from '@/utils/Functions'
import { MyContext } from '@/context/DataProvider'
import { ConfirmationDialog } from './ConfirmationDialog'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
interface Props {
  heading: Heading
  tasks?: Task[][]
  handleOnDrag?: any
  handleOnDrop?: any
}

const BoardStage = (props: Props) => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const { tasks, setTasks, workspace, setWorkspace } = useContext(MyContext)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDelete = async (ws_id: number, order: number) => {
    await deleteStage(ws_id, order)
    setConfirm(false)
    setWorkspace(ws_id)
  }
  const handleConf = () => {
    setConfirm(!confirm)
  }
  return (
    <>
      {confirm ? (
        <ConfirmationDialog
          open={confirm}
          handleClose={handleConf}
          handleSubmit={() =>
            handleDelete(
              parseInt(props.heading.workspace.toString()),
              props.heading.order
            )
          }
        />
      ) : null}
      <div
        style={{
          width: '370px',
          height: '80vh',
          border: '2px solid white',
          borderRadius: '10px',
          display: 'flex',
          margin: 5,
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'auto',
        }}
        onDragOver={handleDragOver}
        onDrop={props.handleOnDrop}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid white',
            marginBottom: '5px',
          }}
        >
          <div
            style={{
              flex: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h2
              style={{
                paddingLeft: 30,
              }}
            >
              {props.heading.text}
            </h2>
          </div>
          <div onClick={() => setConfirm(true)}>
            <DeleteOutlineIcon style={{ padding: 10 }} />
          </div>
        </div>
        {props.tasks &&
        props.tasks.length > 0 &&
        props.tasks[props.heading.order]
          ? props.tasks[props.heading.order].map((task) => {
              return (
                <TaskCard
                  task={task}
                  key={task.title}
                  handleOnDrag={props.handleOnDrag}
                />
              )
            })
          : null}
      </div>
    </>
  )
}

export default BoardStage
