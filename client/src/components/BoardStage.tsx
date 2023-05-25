import React, { useContext, useState } from 'react'
import TaskCard from './TaskCard'
import { Heading, Task } from '@/utils/Types'
interface Props {
  heading: Heading
  tasks?: Task[][]
  handleOnDrag?: any
  handleOnDrop?: any
}

const BoardStage = (props: Props) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  console.log('Boardstage props', props)
  return (
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
      <h2 style={{ borderBottom: '1px solid white' }}>{props.heading.text}</h2>
      {props.tasks && props.tasks.length > 0 && props.tasks[props.heading.order]
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
  )
}

export default BoardStage
