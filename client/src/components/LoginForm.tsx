import React from "react";
import { StandardInput } from "./StandardInput";
import { StandardButton } from "./StandardButton";

interface Props {
  onSubmit?: any;
}

export const LoginForm = (props: Props) => {
  return (
    <>
      <form
        onSubmit={props.onSubmit}
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <StandardInput placeholderText="Email" type="text" />
        <StandardInput placeholderText="Password" type="password" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StandardButton text="Login" margin="10px" />
          <StandardButton text="Signup" margin="10px" />
        </div>
      </form>
    </>
  );
};
