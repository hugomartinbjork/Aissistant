import React, { useContext, useEffect, useState } from "react";
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
import { StandardInput } from "./StandardInput";
import { MiniUser, Task, User } from "@/utils/Types";
import { MyContext } from "@/context/DataProvider";
import { getWorkspacesUsers } from "@/utils/Functions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Props {
  open: boolean;
  handleClose: any;
  handleSubmit: any;
  handleReset: any;
  task: Task;
  confirmAssign: boolean;
  confirmClear: boolean;
}

export const AssignDialog = (props: Props) => {
  const { workspace } = useContext(MyContext);
  const [users, setUsers] = useState<MiniUser[]>([]);
  const [assignedUser, setAssignedUser] = useState<MiniUser>();

  const fetchUsers = async () => {
    if (workspace) {
      const data = await getWorkspacesUsers(workspace.id);
      const list = data as MiniUser[];
      setUsers([...data]);
      const current = list.filter((user) => user.id === props.task.assigned);
      if (current) {
        setAssignedUser(current[0]);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [props.task]);

  const handleSubmit = async () => {
    if (assignedUser) {
      await props.handleSubmit(assignedUser?.id);
    } else {
      handleReset();
    }
  };
  const handleReset = async () => {
    await props.handleReset(props.task.task_id);
  };

  const handleAssignClick = (u: MiniUser) => {
    if (assignedUser && assignedUser.id === u.id) {
      setAssignedUser(undefined);
    } else {
      setAssignedUser(u);
    }
  };

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
        Choose user to assign
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
        {props.confirmAssign ? (
          <>
            <h1>User Assigned!</h1>
          </>
        ) : (
          <>
            {props.confirmClear ? (
              <>
                <h1>Task Cleared!</h1>
              </>
            ) : (
              <>
                {" "}
                {users &&
                  users.length > 0 &&
                  users.map((user) => (
                    <div
                      key={user.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "40%",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          cursor: "pointer",
                          textDecoration: "underline",
                          marginRight: "12px",
                        }}
                        key={user.id}
                        onClick={() => handleAssignClick(user)}
                      >
                        {user.name}
                      </p>
                      {assignedUser && assignedUser.id === user.id ? (
                        <>
                          <CheckCircleOutlineIcon
                            style={{ color: "aqua", marginLeft: "12px" }}
                          />
                        </>
                      ) : (
                        <>
                          <CheckCircleOutlineIcon
                            style={{ marginLeft: "12px", opacity: "0.5" }}
                          />
                        </>
                      )}
                    </div>
                  ))}
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <StandardButton text="Done" onClick={() => handleSubmit()} />
        {/* <StandardButton text="Reset" onClick={() => handleReset()} /> */}
      </DialogActions>
    </Dialog>
  );
};
