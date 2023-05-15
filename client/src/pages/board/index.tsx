import Navbar from "@/components/Nav";
import styles from "./styles.module.css";
import BoardStage from "@/components/BoardStage";
import { Task } from "@/utils/Types";
import { useEffect, useState } from "react";

export default function Home() {
  const [plannedTasks, setPlannedTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    setPlannedTasks([
      { title: "Jobba", importance: 3 },
      { title: "Kröka", importance: 5, comment: "I särklass viktigast" },
      { title: "Sova", importance: 1 },
    ]);
  }, []);

  const handleOnDrag = (e: React.DragEvent, taskTitle: string) => {
    e.dataTransfer.setData("task", taskTitle);
  };

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
          <BoardStage
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
          />
        </div>
      </div>
    </>
  );
}
