import Navbar from "@/components/Nav";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.css";
import { LoginForm } from "@/components/LoginForm";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1 style={{ fontSize: "40px", marginTop: "50px" }}>Welcome</h1>;
        <LoginForm onSubmit={loginUser} />
      </div>
    </>
  );
}
