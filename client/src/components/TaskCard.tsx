import { Task, UpdateTask } from "@/utils/Types";
import React, { useContext, useState } from "react";
import { StandardButton } from "./StandardButton";
import { updateTask, deleteTask } from "@/utils/Functions";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { MyContext } from "@/context/DataProvider";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { useRouter } from "next/router";

interface Props {
  task: Task;
  handleOnDrag?: any;
}

const TaskCard = (props: Props) => {
  const { tasks, setTasks, workspace, setWorkspace } = useContext(MyContext);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const modifyTask = async (title?: string, todo?: string) => {
    const newData: UpdateTask = {
      task_id: props.task.task_id,
      todo: todo,
      title: title,
    };
    await updateTask(newData);
    setOpen(false);
    setWorkspace(workspace?.id as number);
  };
  const handleChange = () => {
    setOpen(!open);
  };

  const handleConf = () => {
    setConfirm(!confirm);
  };
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setWorkspace(workspace?.id as number);
  };

  const handleOpenInWriter = () => {
    router.push("/writer/" + props.task.task_id);
  };

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
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            border: "1px solid white",
            margin: "5px",
            padding: "5px",
            overflow: "hidden",
          }}
          draggable
          onDragStart={(e) => props.handleOnDrag(e, props.task.task_id)}
        >
          <p style={{ margin: "2px" }}>Task: {props.task.title}</p>
          <p style={{ margin: "2px" }}>Todo: {props.task.todo}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <StandardButton
              minWidth="5px"
              padding="8px"
              fontSize="13px"
              text="Modify"
              margin="8px"
              onClick={() => setOpen(true)}
            />
            <StandardButton
              minWidth="5px"
              padding="8px"
              fontSize="13px"
              text="Delete"
              margin="8px"
              onClick={() => setConfirm(true)}
            />
            <StandardButton
              minWidth="5px"
              padding="8px"
              fontSize="13px"
              text="Open in writer"
              margin="8px"
              onClick={() => handleOpenInWriter()}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default TaskCard;
