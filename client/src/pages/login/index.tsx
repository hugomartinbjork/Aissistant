import Navbar from "@/components/Nav";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.css";
import { LoginForm } from "@/components/LoginForm";

export default function Login() {
  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1 style={{ fontSize: "40px", marginTop: "50px" }}>Welcome</h1>;
        <LoginForm />
      </div>
    </>
  );
}
