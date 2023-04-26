import Navbar from "@/components/Nav";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { StandardInput } from "@/components/StandardInput";
import { StandardButton } from "@/components/StandardButton";
import { useState } from "react";
import { TermsDialog } from "@/components/TermsDialog";

export default function Signup() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1 style={{ fontSize: "40px", marginTop: "50px" }}>Signup</h1>;
        <form
          onSubmit={() => console.log("Submit")}
          style={{
            borderRadius: "10px",
            padding: "10px",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Enter your credentials to create an account
          </h3>
          <StandardInput placeholderText="Enter email address" type="text" />
          <StandardInput placeholderText="Password" type="password" />
          <StandardInput placeholderText="Confirm Password" type="password" />
          <p style={{ textAlign: "center" }}>
            I agree to the{" "}
            <a
              style={{ color: "aqua", cursor: "pointer" }}
              onClick={handleOpen}
            >
              terms of conditions
            </a>
            .
          </p>
          <div className={styles.bottom}>
            <StandardButton text="Create account" margin="10px" />
          </div>
        </form>
      </div>
      <TermsDialog open={open} handleClose={handleClose} />
    </>
  );
}
