import { Task } from "@/utils/Types";
import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

interface Props {
  task: Task;
  handleOnDrag?: any;
}

const TaskCard = (props: Props) => {
  // const [{ isDragging }, drag] = useDrag({
  //     item: { type: 'item', props.task },
  //     collect: (monitor: DragSourceMonitor) => ({
  //         isDragging:monitor.isDragging(),
  //     }),
  // });
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        border: "1px solid white",
        margin: "5px",
        padding: "5px",
      }}
      draggable
      onDragStart={(e) => props.handleOnDrag(e, props.task.id)}
    >
      <p style={{ margin: "2px" }}>Task: {props.task.title}</p>
      <p style={{ margin: "2px" }}>Todo: {props.task.todo}</p>
    </div>
  );
};

export default TaskCard;