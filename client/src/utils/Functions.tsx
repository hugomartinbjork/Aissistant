import {
  PostTask,
  SignUpData,
  Task,
  UpdateTask,
  Workspace,
  WorkspacePost,
} from "./Types";

const HOST = "http://127.0.0.1:8000/aisistant/";

export const reWrite = async (str: string) => {
  const prompt = "Rewrite this text: " + str;
  const body = JSON.stringify({ prompt });
  const res = await fetch("/api/openAIChat", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body,
  });
  const json = await res.json();
  return json.prompt;
};
export const signUpUser = async ({ email, password }: SignUpData) => {
  try {
    const resp = await fetch("http://127.0.0.1:8000/aisistant/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getWorkspacesByUser = async (user_id: number) => {
  try {
    const resp = await fetch(HOST + "workspaces/" + user_id);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createWorkspace = async ({ user_id, name }: WorkspacePost) => {
  try {
    const resp = await fetch(HOST + "workspaces/" + user_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTasksByWorkspace = async (ws_id: number) => {
  try {
    const resp = await fetch(HOST + "tasks/" + ws_id);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTask = async (task_id: number) => {
  try {
    const resp = await fetch(HOST + "task/" + task_id);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async ({
  ws_id,
  title,
  todo,
  deadline,
}: PostTask) => {
  try {
    const resp = await fetch(HOST + "tasks/" + ws_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        todo: todo,
        deadline: deadline,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async ({
  task_id,
  assigned,
  title,
  todo,
  deadline,
  order,
}: UpdateTask) => {
  try {
    const resp = await fetch(HOST + "task/" + task_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        assigned: assigned,
        todo: todo,
        deadline: deadline,
        order: order,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};
