import { Task } from "@/utils/Types";
import React from "react";

interface Props {
  task: Task;
}

const TaskCard = (props: Props) => {
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
    >
      <p style={{ margin: "2px" }}>Task: {props.task.title}</p>
      <p style={{ margin: "2px" }}>importance: {props.task.importance}</p>
      {props.task.comment && (
        <p style={{ margin: "2px" }}>Comment: {props.task.comment}</p>
      )}
    </div>
  );
};

export default TaskCard;
