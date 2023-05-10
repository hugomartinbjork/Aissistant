import Navbar from "@/components/Nav";
import styles from "./styles.module.css";
import BoardStage from "@/components/BoardStage";
import { Task } from "@/utils/Types";

export default function Home() {
  const tasks: Task[] = [
    { title: "Jobba", importance: 3 },
    { title: "Kröka", importance: 5, comment: "I särklass viktigast" },
    { title: "Sova", importance: 1 },
  ];
  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1 className={styles.mainHeading}>Workboard</h1>
        <div className={styles.stageContainer}>
          <BoardStage heading="Planned" tasks={tasks} />
          <BoardStage heading="Doing" />
          <BoardStage heading="Done" />
        </div>
      </div>
    </>
  );
}
