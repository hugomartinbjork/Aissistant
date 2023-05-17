import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  IconButton,
  TextField,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { StandardButton } from "./StandardButton";

interface Props {
  open: boolean;
  handleClose: any;
}

export const CreateTaskDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        style: {
          maxHeight: "600px",
          height: "100%",
          maxWidth: "500px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "5px",
          border: "2px solid white",
          backgroundColor: "black",
          color: "white",
        },
      }}
    >
      <DialogTitle
        style={{
          fontFamily: "'Raleway', sans-serif",
          color: "white",
          fontSize: "25px",
        }}
      >
        Create a new task
        <Box borderBottom={1} borderColor="grey.300" width="100%" />
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          style={{ position: "absolute", top: 0, right: 0, color: "white" }}
        >
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <form id="taskform"></form>
      </DialogContent>
      <DialogActions>
        <StandardButton onClick={() => console.log("Dialog")} text="Click" />
      </DialogActions>
    </Dialog>
  );
};
