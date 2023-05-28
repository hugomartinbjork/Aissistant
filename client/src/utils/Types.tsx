export interface User {
  id: number
  daily_count: number
  email: string
  token: string
}
export interface MiniUser {
  id: number
  name: string
}

export interface SignUpData {
  email: string
  password: string
}

export interface Task {
  task_id: number
  assigned: User
  workspace: Workspace
  title: string
  todo: string
  deadline?: Date
  heading: Heading
}

export interface UpdateTask {
  task_id: number
  assigned?: number
  title?: string
  todo?: string
  deadline?: Date
  order?: number
}

export interface PostTask {
  ws_id: number
  title: string
  todo: string
  deadline?: Date
}

export interface PostHeading {
  ws_id: number
  text: string
  order?: number
}
export interface Workspace {
  id: number
  name: string
  users: number[]
  headings: Heading[]
}

export interface WorkspacePost {
  name: string
  user_id: number
}

export interface Heading {
  order: number
  text: string
  workspace: Workspace
}
export interface WorkspacePutL {
  name?: string
  user_id: number
}
export interface WorkspacePutA {
  name?: string
  user_id?: number
  ws_id: number
}
