import React, { useEffect, useState } from "react";
import WritersBlock from "@/components/WritersBlock";
import { useRouter } from "next/router";
import withAuth from "@/context/WithAuth";
import AuthContext from "@/context/AuthContext";
import Dropdown from "@/components/Dropdown";
import { MyContext } from "@/context/DataProvider";
import { getTaskText, updateTaskText, createTaskText } from "@/utils/Functions";
import { UpdateTaskText } from "@/utils/Types";
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { StandardButton } from "@/components/StandardButton";

function TaskWriter() {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [taskHasText, setTaskHasText] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const {
    query: { taskId },
  } = useRouter();

  const fetchData = async () => {
    const data = await getTaskText(parseInt(taskId as string));
    if (data) {
      setTaskHasText(true);
      setText(data.content);
      setTitle(data.title);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  const saveToTask = async (title: string, content: string) => {
    const id = parseInt(taskId as string);
    const data: UpdateTaskText = {
      task_id: id,
      title: title,
      content: content,
    };
    if (taskHasText) {
      await updateTaskText(data);
    } else {
      await createTaskText(data);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WritersBlock
          storedSubject={title}
          storedText={text}
          isTask={true}
          handleSaveToTask={saveToTask}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "600px",
            maxWidth: "500px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "15px",
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
          Your progress has been saved!
          <Box borderBottom={1} borderColor="grey.300" width="100%" />
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", top: 0, right: 0, color: "white" }}
          >
            <CloseSharpIcon />
          </IconButton>
        </DialogTitle>
        <DialogActions>
          <StandardButton text="Close" onClick={() => handleClose()} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withAuth(TaskWriter);
