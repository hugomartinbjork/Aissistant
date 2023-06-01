import {
  PostTask,
  SignUpData,
  Task,
  TaskText,
  UpdateTask,
  Workspace,
  WorkspacePost,
  PostHeading,
  WorkspacePutL,
  WorkspacePutA,
  PostTaskText,
  UpdateTaskText,
} from './Types'

const HOST = 'http://127.0.0.1:8000/aisistant/'

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
    const resp = await fetch('http://127.0.0.1:8000/aisistant/users', {
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

export const getUsers = async () => {
  try {
    const resp = await fetch(HOST + 'users')
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getUser = async (user_id: number) => {
  try {
    const resp = await fetch(HOST + 'singleuser/' + user_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// <Workspace>

export const getWorkspaceById = async (ws_id: any) => {
  try {
    const resp = await fetch(HOST + 'workspace/' + ws_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const getWorkspacesByUser = async (user_id: number) => {
  try {
    const resp = await fetch(HOST + 'workspaces/' + user_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const getWorkspacesUsers = async (ws_id: number) => {
  try {
    const resp = await fetch(HOST + 'users/' + ws_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createWorkspace = async ({ user_id, name }: WorkspacePost) => {
  try {
    const resp = await fetch(HOST + 'workspaces/' + user_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const deleteWorkspace = async (ws_id: number) => {
  try {
    const resp = await fetch(HOST + 'workspace/' + ws_id, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }
}
// Update / Add user to workspace
export const updateWorkspaceA = async ({
  name,
  ws_id,
  user_id,
}: WorkspacePutA) => {
  try {
    const resp = await fetch(HOST + 'workspace/' + ws_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
export const updateWorkspaceL = async ({
  name,
  ws_id,
  user_id,
}: WorkspacePutL) => {
  try {
    const resp = await fetch(HOST + 'workspaces/' + ws_id + '/' + user_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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

export const getTasksByWorkspace = async (ws_id: number) => {
  try {
    const resp = await fetch(HOST + 'tasks/' + ws_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getTask = async (task_id: number) => {
  try {
    const resp = await fetch(HOST + 'task/' + task_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createTask = async ({
  ws_id,
  title,
  todo,
  deadline,
}: PostTask) => {
  try {
    const resp = await fetch(HOST + 'tasks/' + ws_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const updateTask = async ({
  task_id,
  assigned,
  title,
  todo,
  deadline,
  order,
}: UpdateTask) => {
  try {
    const resp = await fetch(HOST + 'task/' + task_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
export const deleteTask = async (task_id: number) => {
  try {
    const resp = await fetch(HOST + 'task/' + task_id, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }
}

// <HEADINGS>
export const createStage = async ({ ws_id, text, order }: PostHeading) => {
  try {
    const resp = await fetch(HOST + 'headings/' + ws_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const deleteStage = async (ws_id: number, order: number) => {
  try {
    const resp = await fetch(HOST + 'heading/' + ws_id + '/' + order, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }
}

export const getTaskText = async (task_id: number) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id)
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export const createTaskText = async ({
  task_id,
  title,
  content,
}: UpdateTaskText) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const updateTaskText = async ({
  task_id,
  title,
  content,
}: UpdateTaskText) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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

export const deleteTaskText = async (task_id: number) => {
  try {
    const resp = await fetch(HOST + 'tasktext/' + task_id, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }
}

export const assignUserToTask = async (task_id: number, user_id: number) => {
  try {
    const resp = await fetch(HOST + 'assign/' + task_id + '/' + user_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const clearTaskAssign = async (task_id: number) => {
  try {
    const resp = await fetch(HOST + 'clearassigned/' + task_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// <HEADINGS/>
