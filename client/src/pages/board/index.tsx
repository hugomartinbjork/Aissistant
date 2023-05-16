import Navbar from "@/components/Nav";
import styles from "./styles.module.css";
import BoardStage from "@/components/BoardStage";
import { Task, Workspace } from "@/utils/Types";
import { useEffect, useState } from "react";
import { getWorkspacesByUser } from "@/utils/Functions";
import { useAuth } from "@/hooks/useAuth";
import ChooseWorkspace from "@/components/ChooseWorkspace";

export default function Board() {
  const [plannedTasks, setPlannedTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>();
  const [workspaces, setWorkspaces] = useState<Workspace[]>();

  const { auth, user } = useAuth();

  const handleOnDrag = (e: React.DragEvent, taskTitle: string) => {
    e.dataTransfer.setData("task", taskTitle);
  };

  const fetchWorkspaces = async () => {
    const data = (await getWorkspacesByUser(parseInt(user))) as Workspace[];
    setWorkspaces(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

  // Temporary logic for when the board is not customizable
  const getTasksByStage = (targetStage: string) => {
    if (targetStage === "Planned") {
      return plannedTasks;
    } else if (targetStage === "Doing") {
      return doingTasks;
    } else if (targetStage === "Done") {
      return doneTasks;
    } else {
      return [];
    }
  };

  // This function is now hard coded for when there are only three boards with specific titles,
  // This will be made dynamic later
  const handleOnDrop = (e: React.DragEvent, targetStage: string) => {
    const cardTitle = e.dataTransfer.getData("task") as string;

    let updatedSourceTasks: Task[] = [];
    let setSourceTasks: React.Dispatch<React.SetStateAction<Task[]>> = () => {};

    const targetTasks = getTasksByStage(targetStage);
    const targetTask = [...plannedTasks, ...doingTasks, ...doneTasks].find(
      (task) => task.title === cardTitle
    );

    if (targetTask) {
      switch (targetStage) {
        case "Planned":
          if (plannedTasks.find((task) => task.title === cardTitle)) {
            return;
          }
          if (doingTasks.find((task) => task.title === cardTitle)) {
            updatedSourceTasks = doingTasks.filter(
              (task) => task.title !== cardTitle
            );
            setSourceTasks = setDoingTasks;
          } else if (doneTasks.find((task) => task.title === cardTitle)) {
            updatedSourceTasks = doneTasks.filter(
              (task) => task.title !== cardTitle
            );
            setSourceTasks = setDoneTasks;
          }
          setPlannedTasks([...targetTasks, targetTask]);
          break;
        case "Doing":
          if (doingTasks.find((task) => task.title === cardTitle)) {
            return;
          }
          if (plannedTasks.find((task) => task.title === cardTitle)) {
            updatedSourceTasks = plannedTasks.filter(
              (task) => task.title !== cardTitle
            );
            setSourceTasks = setPlannedTasks;
          } else if (doneTasks.find((task) => task.title === cardTitle)) {
            updatedSourceTasks = doneTasks.filter(
              (task) => task.title !== cardTitle
            );
            setSourceTasks = setDoneTasks;
          }
          setDoingTasks([...targetTasks, targetTask]);
          break;
        case "Done":
          if (doneTasks.find((task) => task.title === cardTitle)) {
            return;
          }
          if (plannedTasks.find((task) => task.title === cardTitle)) {
            updatedSourceTasks = plannedTasks.filter(
              (task) => task.title !== cardTitle
            );
            setSourceTasks = setPlannedTasks;
          } else if (doingTasks.find((task) => task.title === cardTitle)) {
            updatedSourceTasks = doingTasks.filter(
              (task) => task.title !== cardTitle
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
                heading={heading.text}
                tasks={plannedTasks}
                setTasks={setPlannedTasks}
                handleOnDrag={handleOnDrag}
                handleOnDrop={(e: any) => handleOnDrop(e, heading.text)}
              />
            ))
          )}

          {/* <BoardStage
            heading="Planned"
            tasks={plannedTasks}
            setTasks={setPlannedTasks}
            handleOnDrag={handleOnDrag}
            handleOnDrop={(e: any) => handleOnDrop(e, "Planned")}
            addButton={true}
          />
          <BoardStage
            heading="Doing"
            handleOnDrag={handleOnDrag}
            handleOnDrop={(e: any) => handleOnDrop(e, "Doing")}
            tasks={doingTasks}
            setTasks={setDoingTasks}
          />
          <BoardStage
            heading="Done"
            handleOnDrag={handleOnDrag}
            handleOnDrop={(e: any) => handleOnDrop(e, "Done")}
            tasks={doneTasks}
            setTasks={setDoneTasks}
          /> */}
        </div>
      </div>
    </>
  );
}
