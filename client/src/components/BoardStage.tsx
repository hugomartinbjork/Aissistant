import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Heading, Task } from "@/utils/Types";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { width } from "pdfkit/js/page";

interface Props {
  heading: Heading;
  addButton?: boolean;
  onAddClick?: any;
  tasks?: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  handleOnDrag?: any;
  handleOnDrop?: any;
}

const BoardStage = (props: Props) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        width: "360px",
        height: "80vh",
        border: "2px solid white",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
      onDragOver={handleDragOver}
      onDrop={props.handleOnDrop}
    >
      <h2 style={{ borderBottom: "1px solid white" }}>{props.heading.text}</h2>
      {props.addButton && (
        <AddBoxOutlinedIcon
          style={{
            position: "absolute",
            top: "5",
            right: "5",
            width: "40px",
            height: "40px",
          }}
        />
      )}
      {props.tasks && props.tasks.length > 0
        ? props.tasks.map((task) => {
            return (
              <TaskCard
                task={task}
                key={task.title}
                handleOnDrag={props.handleOnDrag}
              />
            );
          })
        : null}
    </div>
  );
};

export default BoardStage;
