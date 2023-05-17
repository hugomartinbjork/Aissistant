export interface User {
  id: number;
  daily_count: number;
  email: string;
  token: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface Task {
  id: number;
  assigned: User;
  workspace: Workspace;
  title: string;
  todo: string;
  deadline?: Date;
  heading: Heading;
}

export interface PostTask {
  ws_id: number;
  title: string;
  todo: string;
  deadline?: Date;
}

export interface Workspace {
  id: number;
  name: string;
  users: number[];
  headings: Heading[];
}

export interface WorkspacePost {
  name: string;
  user_id: number;
}

export interface Heading {
  order: number;
  text: string;
  workspace: Workspace;
}
