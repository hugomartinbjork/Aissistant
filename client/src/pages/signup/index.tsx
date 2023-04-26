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
  // Dialog related consts
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const acceptTerms = e.target.acceptTerms.checked;

    if (password.length < 6) {
      setError("Your password needs to be at least 6 characters");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords does not match");
      return;
    }
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all the fields");
      return;
    } else if (!acceptTerms) {
      setError("Please accept the terms and conditions to use the service");
      return;
    }
    setError("");
  };

  return (
    <>
      <Navbar title="DefaultIcon" />
      <div className={styles.outer}>
        <h1 style={{ fontSize: "40px", marginTop: "50px" }}>Signup</h1>;
        <form
          onSubmit={handleSubmit}
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
          <StandardInput
            placeholderText="Enter email address"
            type="email"
            name="email"
          />
          <StandardInput
            placeholderText="Password"
            type="password"
            name="password"
          />
          <StandardInput
            placeholderText="Confirm Password"
            type="password"
            name="confirmPassword"
          />
          <input
            type="checkbox"
            style={{ marginRight: "10px", marginLeft: "30px" }}
            name="acceptTerms"
          />
          <span>
            I agree to the{" "}
            <a
              style={{ color: "aqua", cursor: "pointer" }}
              onClick={handleOpen}
            >
              terms and conditions
            </a>
            .
          </span>
          <div className={styles.bottom}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <StandardButton
              text="Create account"
              margin="10px"
              // onClick={() => handleSubmit}
            />
          </div>
        </form>
      </div>
      <TermsDialog open={open} handleClose={handleClose} />
    </>
  );
}
