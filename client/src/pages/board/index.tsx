import Navbar from "@/components/Nav";
import styles from "./styles.module.css";
import BoardStage from "@/components/BoardStage";
import { Task, Workspace } from "@/utils/Types";
import { useEffect, useState } from "react";
import { getTasksByWorkspace, getWorkspacesByUser } from "@/utils/Functions";
import { useAuth } from "@/hooks/useAuth";
import ChooseWorkspace from "@/components/ChooseWorkspace";
import { log } from "console";

export default function Board() {
  const [plannedTasks, setPlannedTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<Task[]>([]);

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>();
  const [workspaces, setWorkspaces] = useState<Workspace[]>();

  const { auth, user } = useAuth();

  const handleOnDrag = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("task", taskId.toString());
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
        setPlannedTasks(data);
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
  const getTasksByStage = (targetStage: number) => {
    if (targetStage === 0) {
      return plannedTasks;
    } else if (targetStage === 1) {
      return doingTasks;
    } else if (targetStage === 2) {
      return doneTasks;
    } else {
      return [];
    }
  };

  const chooseBoardTasks = (stage: number) => {
    switch (stage) {
      case 0:
        return plannedTasks;
      case 1:
        return doingTasks;
      case 2:
        return doneTasks;
      default:
        return defaultTasks;
    }
  };

  const chooseBoardSetter = (stage: number) => {
    switch (stage) {
      case 0:
        return setPlannedTasks;
      case 1:
        return setDoingTasks;
      case 2:
        return setDoneTasks;
      default:
        return setDefaultTasks;
    }
  };

  // This function is now hard coded for when there are only three boards with specific titles,
  // This will be made dynamic later
  const handleOnDrop = (e: React.DragEvent, targetStage: number) => {
    const taskId = parseInt(e.dataTransfer.getData("task") as string);

    let updatedSourceTasks: Task[] = [];
    let setSourceTasks: React.Dispatch<React.SetStateAction<Task[]>> = () => {};

    const targetTasks = getTasksByStage(targetStage);
    const targetTask = [...plannedTasks, ...doingTasks, ...doneTasks].find(
      (task) => task.id === taskId
    );

    if (targetTask) {
      switch (targetStage) {
        case 0:
          if (plannedTasks.find((task) => task.id === taskId)) {
            return;
          }
          if (doingTasks.find((task) => task.id === taskId)) {
            updatedSourceTasks = doingTasks.filter(
              (task) => task.id !== taskId
            );
            setSourceTasks = setDoingTasks;
          } else if (doneTasks.find((task) => task.id === taskId)) {
            updatedSourceTasks = doneTasks.filter((task) => task.id !== taskId);
            setSourceTasks = setDoneTasks;
          }
          setPlannedTasks([...targetTasks, targetTask]);
          break;
        case 1:
          if (doingTasks.find((task) => task.id === taskId)) {
            return;
          }
          if (plannedTasks.find((task) => task.id === taskId)) {
            updatedSourceTasks = plannedTasks.filter(
              (task) => task.id !== taskId
            );
            setSourceTasks = setPlannedTasks;
          } else if (doneTasks.find((task) => task.id === taskId)) {
            updatedSourceTasks = doneTasks.filter((task) => task.id !== taskId);
            setSourceTasks = setDoneTasks;
          }
          setDoingTasks([...targetTasks, targetTask]);
          break;
        case 2:
          if (doneTasks.find((task) => task.id === taskId)) {
            return;
          }
          if (plannedTasks.find((task) => task.id === taskId)) {
            updatedSourceTasks = plannedTasks.filter(
              (task) => task.id !== taskId
            );
            setSourceTasks = setPlannedTasks;
          } else if (doingTasks.find((task) => task.id === taskId)) {
            updatedSourceTasks = doingTasks.filter(
              (task) => task.id !== taskId
            );
            setSourceTasks = setDoingTasks;
          }
          setDoneTasks([...targetTasks, targetTask]);
          break;
        default:
          break;
      }

      setSourceTasks(updatedSourceTasks);
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
                tasks={chooseBoardTasks(heading.order)}
                setTasks={() => chooseBoardSetter(heading.order)}
                addButton={heading.order === 0 ? true : false}
                handleOnDrag={handleOnDrag}
                handleOnDrop={(e: any) => handleOnDrop(e, heading.order)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
