import {
  PostTask,
  SignUpData,
  UpdateTask,
  WorkspacePost,
  PostHeading,
  WorkspacePutL,
  WorkspacePutA,
  UpdateTaskText,
} from './Types'

const HOST = 'https://aissistant-production.up.railway.app/aisistant/'

export const reWrite = async (str: string) => {
  const prompt = 'Rewrite this text: ' + str
  const body = JSON.stringify({ prompt })
  const res = await fetch('/api/openAIChat', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body,
  })
  const json = await res.json()
  return json.prompt
}
export const signUpUser = async ({ email, password }: SignUpData) => {
  try {
    const resp = await fetch(HOST + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

export const getUsers = async (token: string) => {
  try {
    const resp = await fetch(HOST + 'users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getUser = async (token: string, user_id: number) => {
  try {
    const resp = await fetch(HOST + 'singleuser/' + user_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// <Workspace>

export const getWorkspaceById = async (token: string, ws_id: any) => {
  try {
    const resp = await fetch(HOST + 'workspace/' + ws_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const getWorkspacesByUser = async (token: string, user_id: number) => {
  try {
    const resp = await fetch(HOST + 'workspaces/' + user_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const getWorkspacesUsers = async (token: string, ws_id: number) => {
  try {
    const resp = await fetch(HOST + 'users/' + ws_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createWorkspace = async (
  token: string,
  { user_id, name }: WorkspacePost
) => {
  try {
    const resp = await fetch(HOST + 'workspaces/' + user_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const deleteWorkspace = async (token: string, ws_id: number) => {
  try {
    const resp = await fetch(HOST + 'workspace/' + ws_id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
// Update / Add user to workspace
export const updateWorkspaceA = async (
  token: string,
  { name, ws_id, user_id }: WorkspacePutA
) => {
  try {
    const resp = await fetch(HOST + 'workspace/' + ws_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        ws_id: ws_id,
        user_id,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

// Update / Remove user from workspace
export const updateWorkspaceL = async (
  token: string,
  { name, ws_id, user_id }: WorkspacePutL
) => {
  try {
    const resp = await fetch(HOST + 'workspaces/' + ws_id + '/' + user_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        user_id,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

// <Workspace/>

export const getTasksByWorkspace = async (token: string, ws_id: number) => {
  try {
    const resp = await fetch(HOST + 'tasks/' + ws_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getTask = async (token: string, task_id: number) => {
  try {
    const resp = await fetch(HOST + 'task/' + task_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createTask = async (
  token: string,
  { ws_id, title, todo, deadline }: PostTask
) => {
  try {
    const resp = await fetch(HOST + 'tasks/' + ws_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        todo: todo,
        deadline: deadline,
      }),
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const updateTask = async (
  token: string,
  { task_id, assigned, title, todo, deadline, order }: UpdateTask
) => {
  try {
    const resp = await fetch(HOST + 'task/' + task_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        assigned: assigned,
        todo: todo,
        deadline: deadline,
        order: order,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}
export const deleteTask = async (token: string, task_id: number) => {
  try {
    const resp = await fetch(HOST + 'task/' + task_id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// <HEADINGS>
export const createStage = async (
  token: string,
  { ws_id, text, order }: PostHeading
) => {
  try {
    const resp = await fetch(HOST + 'headings/' + ws_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        order,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteStage = async (
  token: string,
  ws_id: number,
  order: number
) => {
  try {
    const resp = await fetch(HOST + 'heading/' + ws_id + '/' + order, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const getTaskText = async (token: string, task_id: number) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const createTaskText = async (
  token: string,
  { task_id, title, content }: UpdateTaskText
) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const updateTaskText = async (
  token: string,
  { task_id, title, content }: UpdateTaskText
) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteTaskText = async (token: string, task_id: number) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const assignUsersToTask = async (
  token: string,
  task_id: number,
  user_ids: string
) => {
  try {
    const resp = await fetch(HOST + 'assign/' + task_id + '/' + user_ids, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const clearTaskAssign = async (token: string, task_id: number) => {
  try {
    const resp = await fetch(HOST + 'clearassigned/' + task_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// <HEADINGS/>
