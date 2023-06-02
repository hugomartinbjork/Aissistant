import { Task, UpdateTask } from '@/utils/Types'
import React, { useContext, useEffect, useState } from 'react'
import { StandardButton } from './StandardButton'
import {
  updateTask,
  deleteTask,
  assignUsersToTask,
  getUser,
  clearTaskAssign,
} from '@/utils/Functions'
import { CreateTaskDialog } from './CreateTaskDialog'
import { MyContext } from '@/context/DataProvider'
import { ConfirmationDialog } from './ConfirmationDialog'
import { useRouter } from 'next/router'
import ListIcon from '@mui/icons-material/List'
import { Menu, MenuItem } from '@mui/material'
import { AssignDialog } from './AssignDialog'
import PersonIcon from '@mui/icons-material/Person'
import AuthContext from '@/context/AuthContext'

interface Props {
  task: Task
  handleOnDrag?: any
}

const TaskCard = (props: Props) => {
  const { tasks, setTasks, workspace, setWorkspace } = useContext(MyContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const [assignedUserNames, setAssignedUserNames] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const menuOpen = Boolean(anchorEl)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [openAssign, setOpenAssign] = useState<boolean>(false)
  const [confirmAssign, setConfirmAssign] = useState<boolean>(false)
  const [confirmClear, setConfirmClear] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const { auth } = useContext(AuthContext)

  const modifyTask = async (title?: string, todo?: string) => {
    const newData: UpdateTask = {
      task_id: props.task.task_id,
      todo: todo,
      title: title,
    }
    await updateTask(auth, newData)
    setOpen(false)
    setWorkspace(workspace?.id as number)
  }
  const handleChange = () => {
    setOpen(!open)
  }

  const handleConf = () => {
    setConfirm(!confirm)
  }
  const handleDelete = async (id: number) => {
    await deleteTask(auth, id)
    setWorkspace(workspace?.id as number)
  }

  const handleOpenInWriter = () => {
    router.push('/writer/' + props.task.task_id)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleCloseAssign = () => {
    setOpenAssign(false)
  }
  const handleSubmitAssign = async (user_ids: string) => {
    if (!user_ids) {
      setOpenAssign(false)
    } else {
      const data = await assignUsersToTask(auth, props.task.task_id, user_ids)

      setConfirmAssign(true)
      setTimeout(() => {
        setConfirmAssign(false)
        setWorkspace(workspace?.id as number)
        setOpenAssign(false)
      }, 1000)
    }
  }

  const handleReset = async (task_id: number) => {
    if (task_id) {
      await clearTaskAssign(auth, task_id)

      setConfirmClear(true)
      setTimeout(() => {
        setConfirmClear(false)
        setOpenAssign(false)
        setWorkspace(workspace?.id as number)
      }, 1000)
    }
  }

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }
  const fetchUser = async () => {
    if (props.task.assigned) {
      const names: string[] = []
      const userPromises = props.task.assigned.map((id) => getUser(auth, id))
      const users = await Promise.all(userPromises)
      users.map((u) => names.push(u.name))
      setAssignedUserNames(names)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [props.task])

  return (
    <>
      {confirm ? (
        <ConfirmationDialog
          open={confirm}
          handleClose={handleConf}
          handleSubmit={() => handleDelete(props.task.task_id)}
        />
      ) : null}
      {open ? (
        <CreateTaskDialog
          open={open}
          handleClose={handleChange}
          handleSubmit={modifyTask}
          header="Modify your task"
          input_title={props.task.title}
          input_todo={props.task.todo}
        />
      ) : (
        <div
          style={{
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            border: '1px solid white',
            margin: '5px',
            padding: '5px',
            overflow: 'hidden',
            position: 'relative',
          }}
          draggable
          onDragStart={(e) => props.handleOnDrag(e, props.task.task_id)}
        >
          <div onClick={(e) => handleMenuOpen(e)}>
            <ListIcon
              style={{
                position: 'absolute',
                top: '0',
                right: '5px',
                height: '32px',
                width: '32px',
                cursor: 'pointer',
              }}
              aria-controls="task-menu"
              aria-haspopup="true"
              onMouseOver={(e) => {
                ;(e.target as HTMLElement).style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                ;(e.target as HTMLElement).style.transform = 'scale(1)'
              }}
            />
          </div>
          <p style={{ margin: '2px' }}>Task: {props.task.title}</p>
          <p style={{ margin: '2px' }}>Todo: {props.task.todo}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Menu
              id="task-menu"
              anchorEl={anchorEl}
              keepMounted
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                style: {
                  backgroundColor: 'black',
                  border: '1px solid white',
                },
              }}
            >
              <MenuItem
                style={{ backgroundColor: 'black', color: 'white' }}
                onClick={() => (setOpen(true), setAnchorEl(null))}
              >
                <span className="bodyText"> Modify</span>
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: 'black', color: 'white' }}
                onClick={() => (setConfirm(true), setAnchorEl(null))}
              >
                <span className="bodyText">Delete</span>
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: 'black', color: 'white' }}
                onClick={() => (setAnchorEl(null), handleOpenInWriter())}
              >
                <span className="bodyText"> Open in Writer</span>
              </MenuItem>
            </Menu>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'relative',
            }}
          >
            {props.task.assigned && props.task.assigned.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <PersonIcon style={{ color: 'aqua', marginRight: '10px' }} />
                {showTooltip && (
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: '999',
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '12px',
                      marginBottom: '8px',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '8px',
                      overflowY: 'auto',
                      minWidth: '140px',
                    }}
                  >
                    <>
                      <span
                        style={{
                          textDecoration: 'underline',
                          marginBottom: '5px',
                        }}
                      >
                        Assigned to this task:
                      </span>
                      {assignedUserNames.map((name, index) => (
                        <span key={index}>{name}</span>
                      ))}
                    </>
                  </span>
                )}
              </div>
            )}

            <StandardButton
              minWidth="5px"
              padding="8px"
              fontSize="13px"
              text="Assign"
              onClick={() => setOpenAssign(true)}
            />
          </div>
        </div>
      )}
      <AssignDialog
        open={openAssign}
        handleClose={handleCloseAssign}
        task={props.task}
        confirmAssign={confirmAssign}
        confirmClear={confirmClear}
        handleSubmit={handleSubmitAssign}
        handleReset={handleReset}
      />
    </>
  )
}
export default TaskCard
