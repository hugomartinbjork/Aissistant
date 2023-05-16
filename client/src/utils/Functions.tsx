import { SignUpData, Workspace, WorkspacePost } from "./Types";

const HOST = "http://127.0.0.1:8000/aisistant/";

const reWrite = async (str: string) => {
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
const signUpUser = async ({ email, password }: SignUpData) => {
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

const createWorkspace = async ({ user_id, name }: WorkspacePost) => {
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

export { reWrite, signUpUser, createWorkspace };
