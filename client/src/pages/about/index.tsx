import Navbar from "@/components/Nav";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.css";
import openai from "../../assets/openai-logo-white.png";
import google from "../../assets/Google-Drive-White.webp";

export default function About() {
  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1
          style={{ fontSize: "40px", marginTop: "50px", marginBottom: "60px" }}
        >
          About AIssistant
        </h1>
        ;
        <div className={styles.inner}>
          <div className={styles.infocard}>
            <div className={styles.imgcont}>
              <Image
                src={openai}
                alt="logo"
                width={100}
                height={100}
                priority={true}
              />
            </div>
            <h1>OpenAI Integration</h1>
            <p style={{ textAlign: "center" }}>
              Our product utilizes the openAI API to integrate a state of the
              art - level language model for you to access directly. No more
              jumping between pages or copy pasting the snippets of code and
              text you want the model to evaluate. Here on AIssistant we provide
              all you will ever need to be productive in one place.
            </p>
          </div>
          <div className={styles.infocard}>
            <div className={styles.imgcont}>
              <Image
                src={google}
                alt="logo"
                width={234}
                height={80}
                priority={true}
              />
            </div>

            <h1>Direct drive access</h1>
            <p style={{ textAlign: "center" }}>
              Through google API integration AIssistant provides easy access to
              your google drive. Use our platform to structure, develop and
              perfect your projects, and then simply write your work directly to
              your google documents with formatting and structure intact. Again,
              all you will ever need to be productive - in one place.
            </p>
          </div>
        </div>
        <div className={styles.inner}>
          <div className={styles.infocard}>
            <h1>The digital taskboard</h1>
            <p style={{ textAlign: "center" }}>
              To make full use of the platform, make sure you get to know all
              the clever tools and aspects of our kanban-inspired workbench.
              Structure, plan, and execute your tasks in an intuitive
              easy-to-use interface. Apart from the elegant looks there are more
              things separating us from other board services. Here you don´t
              just move a card to a "doing" slot and leave - you throw it onto
              the workbench and start utilizing all your tools immidiately.
              Track your time and progress, and evaluate your planning. As if
              that isn´t enough, you get to customize your taskboard to fit your
              needs. Choose from multiple components, throw them on your board
              and get going!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
