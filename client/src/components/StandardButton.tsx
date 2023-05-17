import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  margin?: string;
  form?: string;
}

export const StandardButton = (props: Props) => {
  return (
    <button
      style={{
        border: "solid 1px",
        borderColor: "white",
        fontSize: "20px",
        fontFamily: "Raleway, sans-serif",
        color: "white",
        backgroundColor: "black",
        padding: "16px",
        borderRadius: "10px",
        minWidth: "12rem",
        maxWidth: "12rem",
        margin: props.margin,
      }}
      onMouseOver={(e) => {
        (e.target as HTMLElement).style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        (e.target as HTMLElement).style.transform = "scale(1)";
      }}
      onClick={props.onClick}
      form={props.form}
    >
      {props.text}
    </button>
  );
};
