import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/utils/Types";

interface Props {
  heading?: string;
  tasks?: Task[];
}

const BoardStage = (props: Props) => {
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
      }}
    >
      <h2 style={{ borderBottom: "1px solid white" }}>{props.heading}</h2>
      {props.tasks
        ? props.tasks.map((task) => {
            return <TaskCard task={task} key={task.title} />;
          })
        : null}
    </div>
  );
};

export default BoardStage;
