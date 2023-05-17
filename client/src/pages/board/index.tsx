import Navbar from "@/components/Nav";
import styles from "./styles.module.css";
import BoardStage from "@/components/BoardStage";
import { Task, UpdateTask, Workspace } from "@/utils/Types";
import { useEffect, useState } from "react";
import {
  getTask,
  getTasksByWorkspace,
  getWorkspacesByUser,
  updateTask,
} from "@/utils/Functions";
import { useAuth } from "@/hooks/useAuth";
import ChooseWorkspace from "@/components/ChooseWorkspace";
import { log } from "console";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

export default function Board() {
  const [tasks, setTasks] = useState<Task[][]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleClose = () => {
    setOpenDialog(false);
  };

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>();
  const [workspaces, setWorkspaces] = useState<Workspace[]>();

  const { auth, user } = useAuth();

  const handleOnDrag = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("task", taskId.toString());
  };

  const fetchTask = async (task_id: number) => {
    const data = await getTask(task_id);
    return data;
  };
  const changeTask = async (task_id: number, order: number) => {
    const newData: UpdateTask = { task_id: task_id, order: order };
    await updateTask(newData);
  };

  const fetchWorkspaces = async () => {
    const data = (await getWorkspacesByUser(parseInt(user))) as Workspace[];
    setWorkspaces(data);
    return data;
  };
  const fetchWorkspaceTasks = async () => {
    try {
      if (currentWorkspace) {
        const data = (await getTasksByWorkspace(
          currentWorkspace?.id
        )) as Task[];
        const taskMap: Task[][] = [];
        const nrOfStages = currentWorkspace.headings.length;
        for (let i = 0; i < nrOfStages; i++) {
          taskMap[i] = [];
        }
        data.map((task) => {
          if (!taskMap[task.heading.order]) {
            taskMap[task.heading.order] = [];
          }
          taskMap[task.heading.order].push(task);
        });
        setTasks(taskMap);

        // setPlannedTasks(data);
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);
  useEffect(() => {
    if (currentWorkspace) {
      fetchWorkspaceTasks();
    }
  }, [currentWorkspace]);

  // Temporary logic for when the board is not customizable

  // This function is now hard coded for when there are only three boards with specific titles,
  // This will be made dynamic later
  const handleOnDrop = async (e: React.DragEvent, targetStage: number) => {
    const taskId = parseInt(e.dataTransfer.getData("task") as string);
    const currentTask: Task = await fetchTask(taskId);

    if (currentTask && currentWorkspace && tasks) {
      await changeTask(currentTask.task_id, targetStage).then(() => {
        fetchWorkspaceTasks();
      });
    }
  };

  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1 className={styles.mainHeading}>Workboard</h1>
        <div className={styles.stageContainer}>
          {!currentWorkspace && workspaces ? (
            <ChooseWorkspace
              onClick={setCurrentWorkspace}
              workspaces={workspaces}
            />
          ) : (
            currentWorkspace?.headings.map((heading) => (
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
            ))
          )}
        </div>
      </div>
      <CreateTaskDialog open={openDialog} handleClose={handleClose} />
    </>
  );
}
